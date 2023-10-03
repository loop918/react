const passport = require("passport");
const { User } = require("../models");
const local = require("./local");

module.exports = () => {
  passport.serializeUser((user, done) => {
    console.log('로그인 passport.serializeUser');
    done(null, user.id);
  });
  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findOne({  
        where: { id },
      });
      console.log('로그아웃 passport.deserializeUser');
      done(null, user);
    } catch (error) {
      console.error(error);
      done(error);
    }
  });

  local();
};