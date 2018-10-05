import passport from "passport";
import localstrategy from "passport-local";
import { User } from "./database";

const LocalStrategy = localstrategy.Strategy;

passport.use(
  new LocalStrategy(async function(username, password, done) {
    await User.findOne({ where: { username } }, function(err, user) {
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, false, { message: "Incorrect username." });
      }
      if (!user.validPassword(password)) {
        return done(null, false, { message: "Incorrect password." });
      }
      return done(null, user);
    });
  })
);

module.exports = passport;
