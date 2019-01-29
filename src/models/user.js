// import node modules
const mongoose = require('mongoose');

// define a schema
const UserModelSchema = new mongoose.Schema ({
  name        	    : String,
  stats             : Object
});

// compile model from schema
module.exports = mongoose.model('UserModel', UserModelSchema);

// catches           : Number,
//   drops             : Number,
//   clinkerSnag       : Number,
//   clinkerSnagDrop   : Number,
//   knickerSnag       : Number,
//   knickerSnagDrop   : Number,
//   missComms         : Number,
//   FIFA              : Number,
//   tosses            : Number,
//   shotsOnGoal       : Number,
//   points            : Number,
//   scratches         : Number,
//   misses            : Number,
//   highs             : Number,
//   lows              : Number,
//   fouls             : Number,
//   clinkers          : Number,
//   clinkerScores     : Number,
//   knickers          : Number,
//   knickerScores     : Number,
//   sinkers           : Number