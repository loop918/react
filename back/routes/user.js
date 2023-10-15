const express = require('express');
const bcrypt = require('bcrypt');
const passport = require('passport');
const { Op } = require('sequelize'); // 시퀄라이즈 operator
const router = express.Router();

const { User, Post, Image, Comment, Hashtag } = require('../models');
const { isLoggedIn, isNotLoggedIn } =  require('./middlewares');

router.get('/', async (req, res, next) => { // GET /user
    try {
        if (req.user) {
            const fullUserWithoutPassword = await User.findOne({
                where : { id : req.user.id },
                // attributes : ['id', 'nickname','email'],
                attributes :{ 
                    exclude : ['password']
                },
                include : [{
                    model : Post,
                },{
                    model : User,
                    as : 'Followings',
                },{
                    model : User,
                    as : 'Followers',
                }]
            })
            return res.status(200).json(fullUserWithoutPassword);
        } else {
            return res.status(200).json(null);
        }

    } catch (error) {
        console.error(error);
        next(error);
    }
});

router.get('/:id', async (req, res, next) => { // GET /user/3
    try {
      const fullUserWithoutPassword = await User.findOne({
        where: { id: req.params.id },
        attributes: {
          exclude: ['password']
        },
        include: [{
          model: Post,
          attributes: ['id'],
        }, {
          model: User,
          as: 'Followings',
          attributes: ['id'],
        }, {
          model: User,
          as: 'Followers',
          attributes: ['id'],
        }]
      })
      if (fullUserWithoutPassword) {
        const data = fullUserWithoutPassword.toJSON();
        data.Posts = data.Posts.length;
        data.Followings = data.Followings.length;
        data.Followers = data.Followers.length;
        res.status(200).json(data);
      } else {
        res.status(404).json('존재하지 않는 사용자입니다.');
      }
    } catch (error) {
      console.error(error);
      next(error);
    }
  });

router.get('/:userId/posts', async(req, res, next) => { // GET /posts
    try {
        const where = { UserId : req.params.userId };
        if(parseInt(req.query.lastId, 10)) { // 초기 로딩이 아닐 때.
            where.id = { [Op.lt] : parseInt(req.query.lastId, 10) } // 조건 →  id가 lastId 보다 10 작은 것들! (현재, 내림차순 기준임 - 최신순)
        } 

        const posts = await Post.findAll({
            limit : 10, // 가져올 갯수
            where,
            order : [
                ['createdAt', 'DESC'],
                [Comment, 'createdAt', 'DESC'],
            ],
            include : [{
                model : User, // 게시글 작성자
                attributes : ['id', 'nickname'],
            }, {
                model : Image,
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
            }, {
                model : Post,
                as : 'Retweet',
                include : [{
                    model : User,
                    attributes : ['id', 'nickname'],
                },{
                    model : Image,
                }]
            }],
        })

        return res.status(200).json(posts);
        
    } catch (error) {
        console.error(error);
        next(error);
    }
});

// 로그인
router.post('/login',  (req, res ,next)=> {

    passport.authenticate ('local', (error, user, info) => {
        if (error) {
            console.error(error);
            next(error);
        }

        if (info) {
            return res.status(401).send(info.reason);
        }

        // passort/index.js → req.login
        return req.login(user, async(loginErr) => {
            if(loginErr) {
                console.error(loginErr);
                next(loginErr);
            }

            // login success (JOIN 방법)
            // *반드시 model에 as가 되어있으면 as도 명시 해주자!
            const fullUserWithoutPassword = await User.findOne({
                where : { id : user.id },
                // attributes : ['id', 'nickname','email'],
                attributes :{ 
                    exclude : ['password']
                },
                include : [{
                    model : Post,
                    attributes : ['id'],
                },{
                    model : User,
                    as : 'Followings',
                    attributes : ['id'],
                },{
                    model : User,
                    as : 'Followers',
                    attributes : ['id'],
                }]
            })
            return res.status(200).json(fullUserWithoutPassword);
        });

    })(req, res, next);
    
});

// 회원가입
router.post('/',  async (req, res, next) => {
    try {
        const exUser = await User.findOne({
            where : {
                email : req.body.email,
            }
        });

        if(exUser) {
            return res.status(403).send('이미 사용중인 아이디입니다.');
        }

        const hashedPassword = await bcrypt.hash(req.body.password, 12);
        await User.create({
           email : req.body.email,
           nickname : req.body.nickname,
           password : hashedPassword,
       });
       res.setHeader('Access-Control-Allow-Origin', '*');
       return res.status(200).send('회원가입이 완료되었습니다.');

    } catch (error) {
      console.error(error);
      next(error);
    }
});

// 로그아웃
router.post("/logout", async (req, res, next) => {
	req.logout((err) => {
		req.session.destroy();
		if (err) {
			res.redirect("/");
		} else {
			return res.status(200).send("server ok: 로그아웃 완료");
		}
	});
});

// 닉네임 변경
router.patch('/nickname', isLoggedIn, async(req, res, next) => {
    try {
        await User.update({
            nickname : req.body.nickname,
        }, {
            where : { id : req.user.id }
        });
        return res.status(200).json({ nickname : req.body.nickname });

    } catch(error) {
        console.error(error);
        next(error);
    }
})

// 팔로우
router.patch('/:userId/follow', isLoggedIn, async(req, res, next) => { // PATCH /user/1/follow
    try {
        const user = await User.findOne({
            where : { id : req.params.userId }
        });
        if( !user ) {
            res.status(403).send('없는 사람입니다.');
        }
        await user.addFollowers(req.user.id); // 팔로우.
        return res.status(200).json({UserId : parseInt(req.params.userId, 10)});
        
    } catch(error) {
        console.error(error);
        next(error);
    }
})

// 언 팔로우
router.delete('/:userId/unfollow', isLoggedIn, async(req, res, next) => { // DELETE /user/1/unfollow
    try {
        const user = await User.findOne({
            where : { id : req.params.userId}
        })
        if( !user ) {
            res.status(403).send('없는 사람입니다.');
        }
        await user.removeFollowers(req.user.id); // 언 팔로우.
        return res.status(200).json({UserId : parseInt(req.params.userId, 10) });

    } catch(error) {
        console.error(error);
        next(error);
    }
})

// follwings 불러오기
router.get('/followers', isLoggedIn, async(req, res, next) => { // GET /user/followers
    try {
        const user = await User.findOne({
            where : { id : req.user.id }
        })
        if( !user ) {
            res.status(403).send('없는 사람입니다.');
        }
        const followers = await user.getFollowers();
        return res.status(200).json(followers);

    } catch(error) {
        console.error(error);
        next(error);
    }
})

router.get('/followings', isLoggedIn, async(req, res, next) => { // GET /user/followings
    try {
        const user = await User.findOne({
            where : { id : req.user.id }
        })
        if( !user ) {
            res.status(403).send('없는 사람입니다.');
        }
        const followings = await user.getFollowings();
        return res.status(200).json(followings);

    } catch(error) {
        console.error(error);
        next(error);
    }
})

// 팔로워 제거.
router.delete('/follower/:userId', isLoggedIn, async(req, res, next) => { // DELETE /user/follwer/1
    try {
        const user = await User.findOne({
            where : { id : req.user.id }
        })
        if( !user ) {
            res.status(403).send('없는 사람을 차단하려고 하시네요?');
        }

        await user.removeFollowings(req.user.id);
        return res.status(200).json({ UserId : parseInt(req.params.userId, 10)});

    } catch(error) {
        console.error(error);
        next(error);
    }
})

module.exports = router;

