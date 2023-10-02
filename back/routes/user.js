const express = require('express');
const { User } = require('../models');
const bcrypt = require('bcrypt');
const passport = require('passport');
const Router = express.Router();
const db = require('../models');

// 로그인
Router.post('/login', (req, res ,next)=> {

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

            // login success
            const fullUserWithoutPassword = await User.findOne({
                where : { id : user.id },
                // attributes : ['id', 'nickname','email'],
                attributes :{ 
                    exclude : ['password']
                },
                include : [{
                    model : db.Post,
                },{
                    model : db.User,
                    as : 'Followings',
                },{
                    model : db.User,
                    as : 'Followers',
                }]
            })
            return res.status(200).json(fullUserWithoutPassword);
        });

    })(req, res, next);
    
});


// 회원가입
Router.post('/', async (req, res, next) => {
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

Router.post('/logout', (req, res) => {
    req.logout(); // 쿠키 지우기
    req.session.destory(); // 세션 지우기
    res.send('ok');
});

module.exports = Router;

