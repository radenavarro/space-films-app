var express = require('express');
var router = express.Router();
var models = require('../models');

router.get('/', (req, res)=>{
    try {
        models.UserMovies.findAll({
            where : {
                userId : req.user.id
            },
            include : [
                {model: models.Movie}
            ]
        }).then(movies => {
            res.status(200).json({
                error: false,
                data: movies
            })
        })
    } catch (error) {
        console.log(error);
    }
})

module.exports = router;
