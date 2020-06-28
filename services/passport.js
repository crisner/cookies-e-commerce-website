const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/User');

const keys = require('../config/keys');


// Aunthenticated session persistance
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
})

// Google authentication
const GOOGLE_CLIENT_ID = keys.googleClientId;
const GOOGLE_CLIENT_SECRET = keys.googleClientSecret;

passport.use(new GoogleStrategy({
  clientID: GOOGLE_CLIENT_ID,
  clientSecret: GOOGLE_CLIENT_SECRET,
  callbackURL: "/auth/google/callback"
},
(accessToken, refreshToken, profile, done) => {
  User.findOne({ googleId: profile.id }).then(user => {
    if(user) {
      done(null, user);
    } else {
      new User({ googleId: profile.id }).save()
      .then(user => done(null, user));
      
    }
  });
}
)); 