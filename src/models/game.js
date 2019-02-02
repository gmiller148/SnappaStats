const mongoose = require('mongoose');

// define a schema
const GameModelSchema = new mongoose.Schema ({
  time        	    : String,
  playersIDs        : Array,
  players           : Array,
  scoreHome         : Number,
  scoreAway         : Number,
  homeTeamLeft      : Object,
  homeTeamRight     : Object,
  awayTeamLeft      : Object,
  awayTeamRight     : Object, // each contains name and stats for the game
  PBP               : Array
});

// compile model from schema
module.exports = mongoose.model('GameModel', GameModelSchema);
