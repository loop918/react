const express = require('express');
const router = express.Router();
const { Post, Image, Comment , User, Hashtag} = require('../models');
const { isLoggedIn } = require('./middlewares');

const multer = require('multer'); // 이미지 업로드 미들웨어.
const fs = require('fs'); // 파일 시스템 조작 (폴더 등.) 
const path = require('path');

// 업로드 폴더 존재하지 않을시 생성.
try {
    fs.accessSync('uploads');
} catch(err) {
    console.log('uploads 폴더가 없으므로 생성!!')
    fs.mkdirSync('uploads');
}

// 업로드 환경 설정.
const upload = multer({
    storage : multer.diskStorage({
        destination(req, file, done) {
            done(null, 'uploads');  // 폴더이름
        },
        filename(req, file, done){
            // 파일명 
            const ext = path.extname(file.originalname); // 확장자.
            const basename = path.basename(file.originalname, ext); // 파일명
            done( null, basename + "_" + new Date().getTime() + ext ); // () 파일명_ + 시간 + 확장자 ) → 제로초1239132871.png
        },
    }),
    limits : { fileSize : 20 * 1024 * 1024 }, // 파일크기 제한.
});


// 이미지 업로드....
// image input → (name : image) sumit 시 array 형태로 전달 받음.
// 이미지 파일을 단일로 업로드 할 경우 upload.single('image') 하면됨.!
// 이미지 파일을 안올리고 text 형식만 있으면 upload.none() 하면됨.!
router.post('/images', isLoggedIn ,  upload.array('image') , (req, res, next) => {
    try {
        console.log(req.files); 
        res.json(req.files.map((v) => v.filename)); // 파일 업로드 된 주소(파일명) 리턴.

    } catch(err) {
        console.error(err);
        next(err);
    }
});

// Router → /post/.....    formData 로 전달 받음.
// 게시글 등록
router.post('/', isLoggedIn, upload.none(), async(req, res, next) => {
    try {
        // 추가
        const post = await Post.create({
            content : req.body.content,
            UserId : req.user.id,
        });

        // hashtag 
        const hashtags = req.body.content.match(/#[^\s#]+/g);
        if( hashtags ) {
            // tag.slice(1) #제거, toLowerCase 소문자 
            const result = await Promise.all(hashtags.map((tag) => Hashtag.findOrCreate({ 
                where :  { name : tag.slice(1).toLowerCase() },
            })));
            // [[노드,true] , [리액트, true]]
            await post.addHashtags( result.map((v) => v[0]));
        }
        
        // 이미지 가 존재하면..
        if(req.body.image) {
            if (Array.isArray(req.body.image)) { 
                // 이미지를 여러 개의 경우→  image : [제로초.png , 부기초.png] 배열로 올라감!
               const images = await Promise.all( req.body.image.map((image) => Image.create({ src : image })) );
               await post.addImages(images);
            } else { 
                // 이미지를 단일로 올리는 경우 → image 제로초.png 
                const image = await Image.create({ src : req.body.image })
                await post.addImages(image);
            }
        }

        // Join 데이터 가져오기.
        const fullPost = await Post.findOne({
            where : { id : post.id },
            include : [{
                model : Image,
            }, { 
                model : User, // 게시글 작성자
                attributes : ['id', 'nickname'],
            }, {
                model : Comment,
                include : [{
                    model : User, // 댓글 작성자
                    attributes : ['id', 'nickname'],    
                }]
            }, {
                model : User, // 좋아요 누른사람
                as : 'Likers',
                attributes : ['id'],
            }]
        })
        return res.status(201).json(fullPost);

    } catch (error) {
        console.error(error);
        next(error);
    }
});

// 댓글 등록
router.post('/:postId/comment', isLoggedIn,  async (req, res, next) => {
    try {
        const exPost = await Post.findOne({
            where : { id : req.params.postId }
        })

        if( !exPost ) {
            return res.status(403).json('해당 게시글이 존재하지 않습니다.');
        }

        const comment = await Comment.create({
            content : req.body.content,
            PostId : parseInt(req.params.postId, 10),
            UserId : req.user.id,
        })
        const fullComment = await Comment.findOne({
            where : { id : comment.id },
            include : [{
                model : User,
                attributes : ['id', 'nickname'],
            }],
        })
        console.log(fullComment);
        return res.status(201).json(fullComment);

    } catch (error) {
        console.error(error);
        next(error);
    }
});

// 특정 게시글 가져오기
router.get('/:postId' , async (req, res, next) => {
    try {

        const post = await Post.findOne({
            where : { id : req.params.postId},
        })
        if(!post) {
            return res.status(404).send('존재하지 않는 게시글 입니다.');
        }

        const fullPost = await Post.findOne({
            where : { id : post.id },
            include : [{
                model : Post,
                as : 'Retweet',
                include : [{
                    model : User,
                    attributes : ['id', 'nickname'],
                },{
                    model : Image,
                }]
            },{
                model : User,
                attributes : ['id', 'nickname'],
            },{
                model : Image,
                
            },{
                model : Comment,
                include : [{
                    model : User,
                    attributes : ['id', 'nickname'],
                }],
            },{
                model : User,
                as : 'Likers',
                attributes : ['id'],
            }],
        });
        res.status(200).json(fullPost);

    } catch(err) {
        console.error(err);
        next(err);
    }
});


router.patch('/:postId/like', async (req, res, next)=> { // PATCH /post/${data}/like
    try {
        const exPost = await Post.findOne({ where : { id : req.params.postId }})
        if(!exPost) {
            return res.status(403).json('게시글이 존재하지 않습니다.');
        }
        await exPost.addLikers(req.user.id);
        res.json({ PostId : this.post.id, UserId : req.user.id });

    } catch(err) {
        console.error(err);
        next(err)
    }
});

router.delete('/:postId/unlike', async (req, res, next)=> { // DELETE /post/${data}/unlike
    try {
        const exPost = await Post.findOne({ where : { id : req.params.postId }})
        if(!exPost) {
            return res.status(403).json('게시글이 존재하지 않습니다.');
        }
        await exPost.removeLikers(req.user.id);
        res.json({ PostId : this.post.id, UserId : req.user.id });

    } catch(err) {
        console.error(err);
        next(err);
    }
});

// 삭제
router.delete('/:postId', async (req, res, next) => { // DELETE //post/1
        try {
            await Post.destroy({
                where : { id : req.params.postId },
                UserId : req.user.id, // 내가 쓴 게시글.
            })
            res.json({ PostId : parseInt(req.params.postId, 10) });
        } catch(err) {
            console.error(err);
            next(err)
        }
});

router.post(`/:postId/retweet`, isLoggedIn , async (req, res, next) => {
    try {
        const post = await Post.findOne({
            where : { id : req.params.postId},
            include : [{
                model : Post,
                as : 'Retweet',
            }]
        })
        if(!post) {
            return res.status(403).send('존재하지 않는 게시글 입니다.');
        }
        // 자기 자신 게시글을 리트윗 경우, 자기 게시글을 다른사람이 리트윗 한것을 다시 리트윗 한 경우.
        if(req.user.id === post.UserId || (post.Retweet && post.Retweet.UserId === req.user.id )) {
            return res.status(403).send('자신의 글은 리트윗 할 수 없습니다.');
        }   
        const retweetTargetId = post.RetweetId || post.id; // 리트윗 한 원글 게시글 번호를 가져오기.
        const exPost = await Post.findOne({
            where : {
                UserId : req.user.id,
                RetweetId : retweetTargetId,
            },
        });
        if(exPost) {
            return res.status(403).send('이미 리트윗 한 게시글 입니다.');
        }
        // 
        const retweet = await Post.create({
            UserId : req.user.id,
            RetweetId : retweetTargetId,
            content : 'retweet',
        });
        const retweetWithPrevPost = await Post.findOne({
            where : { id : retweet.id },
            include : [{
                model : Post,
                as : 'Retweet',
                include : [{
                    model : User,
                    attributes : ['id', 'nickname'],
                },{
                    model : Image,
                }]
            },{
                model : User,
                attributes : ['id', 'nickname'],
            },{
                model : Image,
                
            },{
                model : Comment,
                include : [{
                    model : User,
                    attributes : ['id', 'nickname'],
                }],
            },{
                model : User,
                as : 'Likers',
                attributes : ['id'],
            }],
        });
        res.status(201).json(retweetWithPrevPost);

    } catch(err) {
        console.error(err);
        next(err);
    }
});

module.exports = router;