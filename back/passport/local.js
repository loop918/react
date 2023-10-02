// 로그인 전략
const passport = require('passport');
const { Strategy : LocalStrategy } = require('passport-local');
const bcrypt = require('bcrypt');
const { User } = require('../models');


module.exports = () => {

    passport.use(new LocalStrategy({
        usernameField : 'email',
        userPassword : 'password',

    }, async (email, password, done) => {
        try {
            
            // 유저 아이디가 존재 하는지.
            const user = await User.findOne({
                where : { email}
            })

            if(!user) {
                // done(서버에러, 성공, 클라이언트에러)
                return done( null, false, { reason : '존재하지 않는 사용자 입니다.!'});
            }
            // success.
            const result  = await bcrypt.compare(password, user.password);
            if(result) {
                return done(null, user);
            }
            // password 틀림.
            return done(null, false, { reason : '비밀번호가 틀렸습니다.'});

        } catch (error) {
            console.error(error);
            return done(error);
        }

    }));
}