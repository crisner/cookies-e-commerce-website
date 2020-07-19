const passport = require('passport');

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
            res.cookie('jwt', token, { httpOnly: true, secure: true });
            res.status(200).json({ success: true })
            // res.redirect('/');
          } catch(err) {
            res.status(400).json({ error: err })
          }
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