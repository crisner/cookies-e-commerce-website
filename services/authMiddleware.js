const passport = require('passport');

const isAuth = (req, res, next) => {
  passport.authenticate('jwt', function(err, user, info) {
    if (err) { 
      return next(err);
    }
    
    try {
      if (!user) {
        res.status(404);
        return res.redirect('/login');
      }

      // Check if user has a valid token
      if (user) {
        const token = user.tokens.filter(token => token.token === req.cookies.jwt)
        if (token && token.length === 0) {
          return res.status(401).redirect('/login');
        }
      }

      req.logIn(user, function(err) {
        if (err) {
          return next(err); 
        }
        req.token = req.cookies.jwt;
        req.user = user;
        next();
      });

    } catch (err) {
      res.status(401).send({ error: 'Please sign in to proceed.' });
    }
  })(req, res, next);
};

const isAdmin = (req, res, next) => {
  if(req.authenticated() && req.user.admin) {
    next();
  } else {
    res.send(401).json({ message: 'Access denied. You are not an authorised user.' });
  }
}

module.exports = {
  isAuth,
  isAdmin
}