var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var playSchema = new Schema({
	'userID' : {
	 	type: Schema.Types.ObjectId,
	 	ref: 'user'
	},
	'score' : Number,
	'startingTime' : Date,
	'endingTime' : Date,
	'playTime': Number,
	'correct': Number,
	'incorrect': Number,
	'questions': [String],
	'correctAnswers': [String]
});

module.exports = mongoose.model('play', playSchema);
