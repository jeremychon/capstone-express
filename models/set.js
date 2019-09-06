const mongoose = require('mongoose')


const setSchema = new mongoose.Schema({
	exerciseId: String,
	reps: Number,
	weight: Number,
	notes: String
})


module.exports = mongoose.model('Sets', setSchema)