var mongoose = require('mongoose');

var noteSchema = mongoose.Schema({
	article_id: mongoose.Schema.Types.ObjectId,
	noteText: String,
});

module.exports = mongoose.model('Note', noteSchema);
