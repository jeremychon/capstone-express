const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
	user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
	planId: String,
	comment: String
})

module.exports = mongoose.model('Comment', commentSchema)