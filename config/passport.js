import passport from "passport";
import localstrategy from "passport-local";
import { User } from "./database";

const LocalStrategy = localstrategy.Strategy;

passport.use(
  new LocalStrategy(function(username, password, done) {
    User.findOne({
      where: {
        username: username
      }
    })
      .then(user => {
        if (!user) {
          return done(null, false, { message: "username incorrect" });
        }
        if (!user.password === password) {
          return done(null, false, { message: "incorrect password" });
        }
        console.log("no error");
        return done(null, user);
      })
      .catch(err => done(err));
  })
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const authorizedUser = await User.findById(id);
    done(null, authorizedUser);
  } catch (err) {
    done(err);
  }
});


module.exports = passport;
