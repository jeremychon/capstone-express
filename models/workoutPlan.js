const mongoose = require('mongoose')
const Exercise = require('./exercise')
const Comment = require('./comment')

const workoutPlanSchema = new mongoose.Schema({
	userId: Schema.Types.ObjectId,
	goalType: String,
	current: Number,
	goal: Number,
	exercises: [Exercise],
	public: Boolean,
	comments: Array
})


module.exports = mongoose.model('WorkoutPlan', workoutPlanSchema)