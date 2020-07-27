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
  proxy: true
},
async (token, refreshToken, profile, done) => {
  try {
    const user = await User.findOne({ googleId: profile.id });

    if (user && !user.google.token) {
      user.google.token = token;
      user.google.name  = profile.displayName;
      user.google.email = profile.emails[0].value;

      await user.save();
      return done(null, user);
    }

    if(user) {
      return done(null, false, { message: 'This account is already in use' });
    }

    // Create new user
    const newUser = await new User({ googleId: profile.id }).save();
    done(null, newUser);
  } catch(err) {
    done(err);
  }
}
)); 

passport.use('google-authz', new GoogleStrategy(
  {
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "/connect/google/callback",
    passReqToCallback : true,
  },
  function(req, token, refreshToken, profile, done) {
    User.findOne({ googleId: profile.id }, async function(err, existingAccount) {
      if (err) { 
        return done(err);
      }

      if (existingAccount) {
        return done(null, false, { message: 'This account is already in use' });
      }

      // Save google authentication details to the logged-in user
      const updateUser = req.user;
      try {
        updateUser.google.id = profile.id;
        updateUser.google.token = token;
        updateUser.google.name  = profile.displayName;
        updateUser.google.email = profile.emails[0].value;
        await updateUser.save();
        return done(null, updateUser);
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

passport.use('local-authz', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
  },
  function(email, password, done) {
    User.findOne({ email }, async function(err, existingAccount) {
      if (err) { 
        return done(err);
      }
      
      if (existingAccount) {
        console.log('existing user:', existingAccount)
        return done(null, false, { message: 'This email is already in use' });
      }
      
      // Send local authentication details to be saved in the user
      const newAccount = {};
      try {
        newAccount.email = email;
        newAccount.password = password;
        done(null, newAccount);
      } catch(err) {
        done(err);
      }
      // return done(null, newAccount);
    });
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