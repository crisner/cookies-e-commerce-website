const passport = require('passport');

const isAuth = (req, res, next) => {
  try {
    passport.authenticate('jwt', function(err, user, info) {
      if (err) { 
        return next(err);
      }
      
      if (!user) {
        return res.status(404).send({error: 'unauthenticated'});
      }

      // Check if user has a valid token
      if (user) {
        const token = user.tokens.filter(token => token.token === req.cookies.jwt)
        if (token && token.length === 0) {
          return res.status(401).send({error: 'unauthenticated'});
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

    })(req, res, next);
  } catch(err) {
    console.log(err)
    res.status(401).send({ error: 'Please sign in to proceed.' });
  }

};

const isAdmin = (req, res, next) => {
  if(req.user.role === 'admin') {
    next();
  } else {
    res.status(401).send({ error: 'Unauthorized' });
  }
}

const authType = (req, res, next) => {
  try {
    if(req.user && req.user.email && !req.user.google.id) {
      req.authType = 'connect';
      next();
    } else {
      next();
    }
  } catch(err) {
    throw err;
  }
  
}

module.exports = {
  isAuth,
  isAdmin,
  authType
}