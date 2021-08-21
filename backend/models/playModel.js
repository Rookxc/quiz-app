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
	'correct': Number,
	'incorrect': Number,
	'questions': String
});

module.exports = mongoose.model('play', playSchema);
