var express = require('express');
var router = express.Router();
var models = require('../models');
var passport = require('passport');

router.get('/', (req, res) => {
    /*
    // find movies where title includes content of title parameter (and include its actors)
    models.Movie.findAll({ 
       where: { 
           title: { 
               $like: '%' + req.query.title + '%' 
            } 
        }, 
        include: [ 
            { 
                model: models.Actor 
            }
        ] 
    })
    */

    // get all movies with its actors
    models.Movie.findAll({
        include: [
            {
                model: models.Actor,
            },
        ]
    })
    .then(movies => {
        res.status(200).json({
            error: false,
            data: movies
        })
    })
});

router.get('/:id', (req, res)=>{
    models.Movie.findOne({
        where : {id : req.params.id},
        include : [
            {
                model: models.Actor
            }
        ]
    })
        .then(movie => {
            res.status(200).json({
                error: false,
                data: movie
            })
        })
})

module.exports = router;
