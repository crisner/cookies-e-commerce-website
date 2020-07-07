const isAuth = (req, res, next) => {
  if(req.authenticated()) {
    next();
  } else {
    res.status(401).json({ message: 'Please sign in to proceed.' });
  }
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