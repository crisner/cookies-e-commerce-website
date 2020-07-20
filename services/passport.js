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
  callbackURL: "/auth/google/callback",
  passReqToCallback : true,
  proxy: true
},
async (req, token, refreshToken, profile, done) => {
  if (!req.user) {
    try {
      const user = await User.findOne({ googleId: profile.id });
      if(user) {
        // if there no token (user was linked at one point and then removed)
        if (!user.google.token) {
          user.google.token = token;
          user.google.name  = profile.displayName;
          user.google.email = profile.emails[0].value;

          await user.save(function(err) {
              if (err)
                  throw err;
              return done(null, user);
          });
        }
        return done(null, user);
      } else {
        const newUser = await new User({ 
          google: {
            googleId: profile.id,
            token: token,
            name : profile.displayName,
            email: profile.emails[0].value
          }
        }).save();
               
        done(null, newUser);
      }
    } catch(err) {
      done(err);
    }
  } else {
    // user already exists and is logged in, link accounts
    try {
      const user = req.user;
      user.google.googleId = profile.id;
      user.google.token = token;
      user.google.name  = profile.displayName;
      user.google.email = profile.emails[0].value;
  
      await user.save();
      done(null, user);
    } catch(err) {
      done(err);
    }
  }
}
)); 

// Email/password login authentication
passport.use('local-login', new LocalStrategy(
  {
    usernameField: 'email',
    passwordField: 'password',
    session: false
  },
  function(email, password, done) {
    User.findOne({ email }, async function(err, user) {
      if (err) { return done(err); }
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

// Email/password signup authentication
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
        if (err) {
          return done(err);
        }
        // Check if email exists
        if (user) {
          return done(null, false, { message: 'Incorrect email or password' });
          // req.flash('signupMessage', 'An account is already associated with this email.')
        }
        // Save new user
        const newUser = new User(req.body);
        try {
          await newUser.save();
          done(null, newUser);
        } catch(err) {
          done(err);
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