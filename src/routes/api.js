const express = require('express');

const User = require('../models/user');
const Game = require('../models/user');

const router = express.Router();

router.post('/newuser',function(req,res) {
    const newUser = new User({
        name:req.body.name,
        stats: {
            catches           : 0,
            drops             : 0,
            clinkerSnag       : 0,
            clinkerDrop       : 0,
            knickerSnag       : 0,
            knickerDrop       : 0,
            missComms         : 0,
            FIFA              : 0,
            tosses            : 0,
            shotsOnGoal       : 0,
            points            : 0,
            scratches         : 0,
            misses            : 0,
            highs             : 0,
            lows              : 0,
            fouls             : 0,
            clinkers          : 0,
            clinkerScores     : 0,
            knickers          : 0,
            knickerScores     : 0,
            sinkers           : 0
        }
    });
    newUser.save();
    res.send({});
});

router.get('/allusers', function(req, res) {
    User.find({}).then(u => {
        res.send(u);
    });
});

router.get('/user',function(req,res) {
    User.findOne({'_id':req.query._id}).then(u => {
        res.send(u);
    });
});


module.exports = router;