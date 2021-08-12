var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var questionSchema = new Schema({
	'question' : String,
	'correct' : String,
	'incorrect' : Array
});

module.exports = mongoose.model('question', questionSchema);
