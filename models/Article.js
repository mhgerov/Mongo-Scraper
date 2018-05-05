var mongoose = require('mongoose');

var articleSchema = mongoose.Schema({
	headline: String,
	summary: String,
	url: String,
	date: Date,
	saved: Boolean
});

module.exports = mongoose.model('Article', articleSchema);

