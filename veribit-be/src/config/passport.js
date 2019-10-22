const passport = require("passport");
const OAuth2Strategy = require("passport-oauth2").Strategy;
const LocalStrategy = require("passport-local").Strategy;
const ModelConstants = require("../models/constants");
const AdminModel = require("../models/admin");
const UserModel = require("../models/user");
const keys = require("../config/development");

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  UserModel.findById(id, (err, user) => {
    done(err, user);
  });
});

//** Sign in using Email and Password.
passport.use(
  "admin",
  new LocalStrategy({ usernameField: "userId" }, (userId, password, done) => {
    AdminModel.findOne({ userId }, (err, user) => {
      console.log("passport: Oauth Hello!")
      if (err) return done(err);
      if (!user) return done(null, false, { msg: "email not found" });
      if (user.status !== ModelConstants.ADMIN_STATUS_VERIFIED)
        return done(null, false, { msg: "Not verified user !" });

      return user.comparePassword(password, (e, isMatch) => {
        if (e) return done(e);
        if (isMatch) return done(null, user);
        return done(null, false, { msg: "Invalid password !" });
      });
    });
  })
);


passport.use(
  "user",
  new LocalStrategy({ usernameField: "email" }, (email, password, done) => {
    UserModel.findOne({ email: email.toLowerCase() }, (err, user) => {
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, false, { msg: "email not found" });
      }
      return user.comparePassword(password, (e, isMatch) => {
        if (e) return done(e);
        if (isMatch) return done(null, user);
        return done(null, false, { msg: "Invalid password !" });
      });
    });
  })
);


/*Wian Koch: 2019-08-01:*
passport.use(
  new OAuth2Strategy(
    {
      authorizationURL: keys.moneyButton.authorizationURL,
      tokenURL: keys.moneyButton.tokenURL,
      clientID: keys.moneyButton.ClientID,
      clientSecret: keys.moneyButton.ClientSecret,
      callbackURL: keys.moneyButton.callbackURL
    },
    function (accessToken, refreshToken, profile, done) {
      console.log(profile);
      User.findOne({ userId: profile.id }, function (err, user) {
        console.log("User is: " + user);
        return done(err, user);
      }).then(currentUser => {
        if (currentUser) {
          console.log("User is: " + currentUser);
          done(null, currentUser);
        }
      });
    }
  )
);*/



