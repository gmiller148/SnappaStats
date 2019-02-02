const express = require('express');

const User = require('../models/user');
const Game = require('../models/game');

const router = express.Router();

let playArray = ['catches','drops','clinkerSnag','clinkerDrop','knickerSnag','knickerDrop','missComms','FIFA','tosses','shotsOnGoal','points','scratches','misses','highs','lows','fouls','clinkers','clinkerScores','knickers','knickerScores','sinkers'];

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

router.post('/newgame',function(req, res) {
    const newGame = new Game({
        'time':req.body.time,
        'playersIDs':req.body.playersIDs,
        'players':req.body.players,
        'scoreHome':req.body.scoreHome,
        'scoreAway':req.body.scoreAway,
        'homeTeamLeft':req.body.homeTeamLeft,
        'homeTeamRight':req.body.homeTeamRight,
        'awayTeamLeft':req.body.awayTeamLeft,
        'awayTeamRight':req.body.awayTeamRight,
        'PBP':req.body.PBP
    });
    newGame.save();
    let players = [req.body.homeTeamLeft,req.body.homeTeamRight,req.body.awayTeamLeft,req.body.awayTeamRight];
    for(let i = 0; i < 4; i++) {
        if (players[i].name) {
            updatePlayer(players[i]);
        }
    }
    res.send({});
});

function updatePlayer(player) {
    User.findOne({'name':player.name}).then(u => {
        u.stats = {
            'catches':u.stats.catches + player.stats.catches,
            'drops':u.stats.drops + player.stats.drops,
            'clinkerSnag':u.stats.clinkerSnag + player.stats.clinkerSnag,
            'clinkerDrop':u.stats.clinkerDrop + player.stats.clinkerDrop,
            'knickerSnag':u.stats.knickerSnag + player.stats.knickerSnag,
            'knickerDrop':u.stats.knickerDrop + player.stats.knickerDrop,
            'missComms':u.stats.missComms += player.stats.missComms,
            'FIFA':u.stats.FIFA + player.stats.FIFA,
            'tosses':u.stats.tosses + player.stats.tosses,
            'shotsOnGoal':u.stats.shotsOnGoal + player.stats.shotsOnGoal,
            'points':u.stats.points + player.stats.points,
            'scratches':u.stats.scratches + player.stats.scratches,
            'misses':u.stats.misses + player.stats.misses,
            'highs':u.stats.highs +=player.stats.highs,
            'lows':u.stats.lows + player.stats.lows,
            'fouls':u.stats.fouls + player.stats.fouls,
            'clinkers':u.stats.clinkers + player.stats.clinkers,
            'clinkerScores':u.stats.clinkerScores + player.stats.clinkerScores,
            'knickers':u.stats.knickers + player.stats.knickers,
            'knickerScores':u.stats.knickerScores + player.stats.knickerScores,
            'sinkers':u.stats.sinkers + player.stats.sinkers
        }
        u.save();
        
    });
}

router.get('/WyNMMO6aZN',function(req, res) {
    res.send({'WyNMMO6aZN':process.env.SUBMIT_PASSWORD});
});
  
module.exports = router;