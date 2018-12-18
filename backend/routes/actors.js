var express = require('express');
var router = express.Router();
var models = require('../models');
var passport = require('passport');

router.get('/', (req, res) => {
    models.Actor.findAll()
    .then(actors => {
        res.status(200).json({
            error: false,
            data: actors
        })
    })
    
});

module.exports = router;
