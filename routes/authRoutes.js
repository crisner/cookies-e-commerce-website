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
  passport.authenticate('local-signup', { successRedirect: '/',
                                   failureRedirect: '/auth/signup',
                                   failureFlash: true })
  );

  app.post('/auth/login',
  passport.authenticate('local-login', { successRedirect: '/',
                                   failureRedirect: '/auth/login',
                                   failureFlash: true })
  );

  app.get('/auth/logout', (req, res) => {
    req.logout();
    res.status(200);
    res.redirect('/');
  })

  app.get('/api/user', (req, res) => {
    res.send(req.user);
  })
};