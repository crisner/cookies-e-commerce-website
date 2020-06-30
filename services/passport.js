const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/User');

const keys = require('../config/keys');


// Aunthenticated session persistance
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    if(!user) {
      return done(new Error('User not found'));
    };
    done(null, user);
  } catch(err) {
    done(err);
  }
});

// Google authentication
const GOOGLE_CLIENT_ID = keys.googleClientId;
const GOOGLE_CLIENT_SECRET = keys.googleClientSecret;

passport.use(new GoogleStrategy({
  clientID: GOOGLE_CLIENT_ID,
  clientSecret: GOOGLE_CLIENT_SECRET,
  callbackURL: "/auth/google/callback",
  proxy: true
},
async (accessToken, refreshToken, profile, done) => {
  try {
    const user = await User.findOne({ googleId: profile.id });
    if(user) {
      return done(null, user);
    }
    const newUser = await new User({ googleId: profile.id }).save();
    done(null, newUser);
  } catch(err) {
    done(err);
  }
}
)); 