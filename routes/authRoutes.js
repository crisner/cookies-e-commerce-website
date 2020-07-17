const passport = require('passport');
const jwt = require('jsonwebtoken');
const keys = require('../config/keys');

module.exports = (app) => {
  app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] }));

  app.get('/auth/google/callback', 
    passport.authenticate('google', { failureRedirect: '/login' }),
    (req, res) => {
      // Successful authentication, redirect home.
      res.redirect('/');
    }
  );

  app.post('/auth/signup',
    passport.authenticate('local-signup', 
      { successRedirect: '/auth/login',
        failureRedirect: '/auth/signup',
        failureFlash: true,
      })
  );

  app.post('/auth/login', (req, res) => {
  passport.authenticate('local-login', 
    { successRedirect: '/',
      failureRedirect: '/auth/login',
      failureFlash: true,
      session: false 
    },
    (error, user) => {

      if (error || !user) {
        res.status(400).json({ error });
      }

      /** This is what ends up in our JWT */
      const payload = {
        id: user.id
      };

      /** assigns payload to req.user */
      req.login(payload, {session: false}, (error) => {
        if (error) {
          res.status(400).send({ error });
        }

        /** generate a signed json web token and return it in the response */
        const token = jwt.sign(payload, keys.jwtSecret, {expiresIn: '3d'});
        console.log(token)
        /** assign our jwt to the cookie */
        res.cookie('jwt', token, { httpOnly: true, secure: true });
        res.status(200).json({ success: true })
        // res.redirect('/');
      });
    },
  )(req, res);
});

  app.get('/auth/logout', (req, res) => {
    req.logout();
    res.status(200);
    res.redirect('/');
  })

  app.get('/api/user', passport.authenticate('jwt', { session: false }), (req, res) => {
    res.send(req.user);
  })
};