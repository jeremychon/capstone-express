const mongoose = require('mongoose')

const exerciseSchema = new mongoose.Schema({
	type: String,
	activity: String,
	description: String
})



module.exports = mongoose.model('Exercise', exerciseSchema)