const passport = require('passport');
const local = require('./local');

const { User } = require('../models');


module.exports = () => {
    
    // req.login 
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    // userid를 이용해서 유저정보 가져오기 
    passport.deserializeUser(async(id, done) => {
        try {
            const user = await User.findOne({where : {id}})
            done(null, user)
        } catch(err) {
            console.error(err);
            done(err);
        }
    }); 

    local();
}