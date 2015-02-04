module.exports = {
  user: function (req, res, next) {
    if (!req.isAuthenticated()) {
      req.session.goingTo = req.originalUrl;
      res.redirect('/login');
    }
  },
  admin: function (req, res, next) {
    if (req.user && req.user.role === 'admin') {
      next();
    } else {
      res.redirect('/');
    }
  }
};