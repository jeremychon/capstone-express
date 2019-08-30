const mongoose = require('mongoose')

const workoutPlanSchema = new mongoose.Schema({
	userId: Number,
	goalType: String,
	current: Number,
	goal: Number,
	exercises: [Object],
	public: Boolean,
	comments: Array
})


module.exports = mongoose.model('WorkoutPlan', workoutPlanSchema)