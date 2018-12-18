var express = require('express');
var router = express.Router();
var models = require('../models');
const jwt = require('jsonwebtoken');
var passport = require('passport');

router.post('/login', passport.authenticate('jwt-login', { session: false }), (req, res) => {
  const token = jwt.sign(req.user.id, 'sp@c3f1t');

  res.status(200).json({
    error: false,
    data: token,
  })
})

router.post('/register', passport.authenticate('local-signup', { session: false }), (req, res) => {
  const token = jwt.sign(req.user.id, 'sp@c3f1t');

  res.status(200).json({
    error: false,
    data: token
  })
});

module.exports = router;
