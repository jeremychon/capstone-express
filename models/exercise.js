const mongoose = require('mongoose')

const exerciseSchema = new mongoose.Schema({
	type: {
		type: String,
		enum: ['Strength and Conditioning', 'Cardio']
	},
	activity: String,
	description: String
})

module.exports = mongoose.model('Exercise', exerciseSchema)