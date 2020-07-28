const passport = require('passport');
const flash = require('connect-flash');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const LocalStrategy = require('passport-local').Strategy;
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
    callbackURL: '/auth/google/callback',
    passReqToCallback : true
  },
  function(req, token, refreshToken, profile, done) {
    User.findOne({ 'google.id': profile.id }, async function(err, user) {
      try {
        if (err) { 
          return done(err);
        }

        if(!req.user) {
          // If user exists with removed authorization
          if (user && !user.google.token) {
            user.google.token = token;
            user.google.name  = profile.displayName;
            user.google.email = profile.emails[0].value;
      
            await user.save();
            return done(null, user);
          }
          // Sign in
          if (user) {
            return done(null, user);
          }
          // Create new user
          const newUser = await new User({ googleId: profile.id }).save();
          return done(null, newUser);
        } else {
          // Prevent linking if user exists
          if (user) {
            return done(null, false, { message: 'This account already exists.' });
          }
          // Link Google account to the logged-in user
          const updateUser = req.user;
          updateUser.google.id = profile.id;
          updateUser.google.token = token;
          updateUser.google.name  = profile.displayName;
          updateUser.google.email = profile.emails[0].value;
          await updateUser.save();
          return done(null, updateUser);
        }
      } catch(err) {
        return done(err);
      }
    });
  }
));

// Local login authentication (Email/password)
passport.use('local-login', new LocalStrategy(
  {
    usernameField: 'email',
    passwordField: 'password',
    session: false
  },
  function(email, password, done) {
    User.findOne({ email }, async function(err, user) {
      if (err) { 
        return done(err); 
      }
      if (!user) {
        return done(null, false, { message: 'Incorrect email or password' });
      }
      const isValidPassword = await user.isValidPassword(password, user.password);
      if (!isValidPassword) {
        return done(null, false, { message: 'Incorrect email or password' });
      }
      return done(null, user);
    });
  }
));

// Local signup authentication (Email/password)
passport.use('local-signup', new LocalStrategy(
  {
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback : true,
    session: false
  },
  function(req, email, password, done) {
    // process.nextTick(function() {
      User.findOne({ email }, async function(err, user) {
        try {
          if (err) {
            return done(err);
          }

          if (user) {
            return done(null, false, { message: 'Account already exists.' });
            // req.flash('signupMessage', 'An account is already associated with this email.')
          }
          
          if(!req.user) {
            // Save new user
            const newUser = new User(req.body);
            await newUser.save();
            return done(null, newUser);
          } else {
            // Link email/password authentication info to the logged-in user
            const updateUser = req.user;
            updateUser.email = email;
            updateUser.password = password;
            await updateUser.save();
            return done(null, updateUser);
          }
        } catch(err) {
          return done(err);
        }
      });
    // })
  }
));

// JWT config
const JwtStrategy = require('passport-jwt').Strategy;
const options = {
  jwtFromRequest: req => req.cookies.jwt,
  secretOrKey: keys.jwtSecret
};

passport.use('jwt', new JwtStrategy(options, function(jwt_payload, done) {
  const _id = jwt_payload.id;
  try {
    User.findOne({ _id }, function(err, user) {
      if (err) {
        console.log('err:', err)
        return done(err, false);
      }
      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    });
  } catch (err) {
    return done(err, false);
  }
    
}));