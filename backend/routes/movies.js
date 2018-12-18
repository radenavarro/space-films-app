var express = require('express');
var router = express.Router();
var models = require('../models');
var passport = require('passport');

router.get('/', (req, res) => {
    models.Movie.findAll()
    .then(movies => {
        res.status(200).json({
            error: false,
            data: movies
        })
    })
});


module.exports = router;
