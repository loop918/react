const express = require('express');

const bcrypt = require('bcrypt');
const passport = require('passport');
const Router = express.Router();

const { User, Post } = require('../models');
const { isLoggedIn, isNotLoggedIn } =  require('./middlewares');

// 로그인
Router.post('/login', isNotLoggedIn, (req, res ,next)=> {

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
                },{
                    model : User,
                    as : 'Followings',
                },{
                    model : User,
                    as : 'Followers',
                }]
            })
            return res.status(200).json(fullUserWithoutPassword);
        });

    })(req, res, next);
    
});


// 회원가입
Router.post('/', isNotLoggedIn, async (req, res, next) => {
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

Router.post("/logout", async (req, res, next) => {
	req.logout((err) => {
		req.session.destroy();
		if (err) {
			res.redirect("/");
		} else {
			res.status(200).send("server ok: 로그아웃 완료");
		}
	});
});

module.exports = Router;

