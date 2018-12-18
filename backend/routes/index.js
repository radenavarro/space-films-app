var express = require('express');
var router = express.Router();
var models = require('../models');
const jwt = require('jsonwebtoken');
var passport = require('passport');

/* POST login. */

router.post('/login', passport.authenticate('jwt-login', { session: false }), (req, res) => {
  // TODO: PETA!!!
  const token = jwt.sign(req.user, 'sp@c3f1t');

  console.log('__token', token);
  res.json(200, {
    error: false,
    data: req.user,
    token,
  })
})
/*
router.post('/login', function (req, res, next) {
    passport.authenticate('jwt-login', { session: false }, (err, user, info) => {
        if (err || !user) {
            return res.status(400).json({
                message: 'Something is not right',
                user   : user,
            });
        }
       req.login(user, {session: false}, (err) => {
           if (err) {
               res.send(err);
           }
           const token = jwt.sign(user, 'sp@c3f1t');
           return res.json({user, token});
        });
    })(req, res);
});
*/
router.post('/register', passport.authenticate('local-signup', {}), (req, res) => {
  res.json(200, {
    error: false,
    data: req.user
  })
});

module.exports = router;
