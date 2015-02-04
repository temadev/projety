var express = require('express')
  , router = express.Router();


router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/profile', function (req, res, next) {
  if (req.user) {
    User.findById(req.user._id).exec(function (err, user) {
      if (err) throw err;
      if (!user) {
        next();
        return;
      }
      res.send(user);
    });
  } else {
    next();
  }
});

router.get('/login', function (req, res, next) {
  if (!req.user) {
    if (req.xhr) {
      res.render('auth/login_modal');
    } else {
      res.render('auth/login');
    }
  } else {
    res.redirect('/');
  }
});

router.get('/register', function (req, res, next) {
  if (!req.user) {
    if (req.xhr) {
      res.render('auth/login_modal');
    } else {
      res.render('auth/register');
    }
  } else {
    res.redirect('/');
  }
});

module.exports = router;
