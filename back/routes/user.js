const express = require('express');

const bcrypt = require('bcrypt');
const passport = require('passport');
const router = express.Router();

const { User, Post } = require('../models');
const { isLoggedIn, isNotLoggedIn } =  require('./middlewares');

router.get('/', async (req, res, next) => { // GET /user
    try {
        console.log(req.user);
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

    } catch (err) {
        console.error(err);
        next(err);
    }
});

// 로그인
router.post('/login',  (req, res ,next)=> {

    passport.authenticate ('local', (err, user, info) => {
        if (err) {
            console.error(err);
            return next(err);
        }

        if (info) {
            return res.status(401).send(info.reason);
        }

        // passort/index.js → req.login
        return req.login(user, async(loginErr) => {
            if(loginErr) {
                console.error(loginErr);
                return next(loginErr);
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
       res.status(200).send('회원가입이 완료되었습니다.');

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
			res.status(200).send("server ok: 로그아웃 완료");
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
        res.status(200).json({ nickname : req.body.nickname });

    } catch(err) {
        console.error(err);
        next(err);
    }
})

module.exports = router;

