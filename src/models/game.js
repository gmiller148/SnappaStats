const mongoose = require('mongoose');

// define a schema
const GameModelSchema = new mongoose.Schema ({
  time        	    : String,
  players           : Array,
  scoreHome         : Number,
  scoreAway         : Number,
  homeTeamRight     : Object,
  homeTeamLeft      : Object,
  awayTeamRight     : Object,
  awayTeamLeft      : Object // each contains name and stats for the game
});

// compile model from schema
module.exports = mongoose.model('GameModel', GameModelSchema);
