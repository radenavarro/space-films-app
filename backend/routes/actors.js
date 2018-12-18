var express = require('express');
var router = express.Router();
var models = require('../models');
var passport = require('passport');

router.get('/', (req, res) => {
    res.json(200, {
        hello: 'world'
    })
});

module.exports = router;
