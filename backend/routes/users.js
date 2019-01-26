var express = require('express');
var router = express.Router();
var models = require('../models');

router.get('/:id', (req, res, next)=>{
    try {
        (async()=>{
            let user = await models.User.findOne({where : {id : req.params.id}});
            if (!user){
                res.status(204).json({
                    error: false
                })
            }
            res.status(200).json({
                error: false,
                data: user
            })
        })()
        // console.log(users);
    } catch (error) {
        res.status(500).json({
            error : true,
            data : error
        })
    }
});

module.exports = router;
