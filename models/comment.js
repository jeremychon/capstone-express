const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
	planId: String,
	comment: String
})

module.exports = mongoose.model('Comment', commentSchema)