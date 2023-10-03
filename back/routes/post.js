const express = require('express');
const router = express.Router();
const { Post, Image, Comment , User} = require('../models');
const { isLoggedIn } = require('./middlewares');

// 게시글 등록
router.post('/', isLoggedIn, async(req, res, next) => {
    try {
        console.log('req.user');
        console.log(req.user);
        // 추가
        const post = await Post.create({
            content : req.body.content,
            UserId : req.user.id,
        })

        // Join
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
        next(err)
    }
});

module.exports = router;