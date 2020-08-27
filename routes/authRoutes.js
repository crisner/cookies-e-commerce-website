const passport = require('passport');
const isAuth = require('../services/authMiddleware').isAuth;
const authType = require('../services/authMiddleware').authType;

module.exports = (app) => {
  app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] }));

  app.get('/auth/google/callback', authType, function(req, res, next) {
    passport.authenticate('google', 
    function(err, user, info) {
      if (err) {
        return next(err); 
      }
      if (!user) {
        console.log('no user')
        if(info.message) {
          return res.redirect('/profile');
        } else {
          return res.redirect('/login');
        }
      }
      if(req.authType === 'connect') {
        // Successful authentication, redirect to profile.
        res.redirect('/profile');
      } else {
        const payload = {
          id: user.id
        };
        /** assigns payload to req.user */
        req.login(payload, {session: false}, async (error) => {
          if (error) {
            res.status(400).send({ error });
          }
  
          try {
            /** generate a signed json web token and return it in the response */
            const token = await user.generateAuthToken(payload);
          
            /** assign our jwt to the cookie */
            res.cookie('jwt', token, 
            // { httpOnly: true, secure: true }
            );
            res.status(200);
            // Successful authentication, redirect home.
            res.redirect('/');
          } catch(err) {
            res.status(400).json({ error: err })
          }
        });
      }
    })(req, res, next)
  });

  app.post('/auth/signup', (req, res) => {
    passport.authenticate('local-signup', 
    (error, user, info) => {
      if (error || !user) {
        res.status(400).json({ error: info });
      }
    }
    )(req, res)
  })

  app.post('/auth/login', (req, res) => {
    passport.authenticate('local-login', 
      { successRedirect: '/',
        failureRedirect: '/auth/login',
        failureFlash: true,
        session: false 
      },
      (error, user, info) => {

        if (error || !user) {
          res.status(400).json({ error: info });
        }

        const payload = {
          id: user.id
        };

        /** assigns payload to req.user */
        req.login(payload, {session: false}, async (error) => {
          if (error) {
            res.status(400).send({ error });
          }

          try {
            /** generate a signed json web token and return it in the response */
            const token = await user.generateAuthToken(payload);
          
            /** assign our jwt to the cookie */
            res.cookie('jwt', token, 
            // { httpOnly: true, secure: true }
            );
            res.status(200).json({ success: true })
            // res.redirect('/');
          } catch(err) {
            res.status(400).json({ error: err })
          }
        });
      },
    )(req, res);
  });

  app.post('/auth/logoutAll', isAuth, async (req, res) => {
    try {
      req.user.tokens = [];
      await req.user.save();
      res.status(200);
      res.redirect('/');
    } catch(err) {
      res.status(500).send();
    }
  })

  app.post('/auth/logout', isAuth, async (req, res) => {
    try {
      req.user.tokens = req.user.tokens.filter(token => token.token !== req.token);
      await req.user.save();
      res.status(200);
      res.redirect('/');
    } catch(err) {
      res.status(500).send();
    }
  })

  app.get('/api/user', isAuth, (req, res) => {
    if(!req.user) {
      return res.status(401).send({ error: 'Please sign in to proceed.' });
    }
    res.status(200).redirect('/profile');
  })

  // Routes to connect strategies to user account if logged in
  // Link local authentication
  app.post('/connect/local', isAuth,
    passport.authorize('local-signup', { failureRedirect: '/' }),
    function(req, res) {
      res.redirect('/profile');
    }
  );

  // Link Google authentication
  app.get('/connect/google', isAuth, passport.authorize('google', { scope : ['profile', 'email'] }));

  // Unlink accounts that use third party services
  app.get('/unlink/google', isAuth, async function(req, res) {
    try {
      const user = req.user;
      user.google.id = undefined;
      user.google.token = undefined;
      await user.save();
      res.redirect('/profile');
    } catch(err) {
      throw err;
    }
  });

};