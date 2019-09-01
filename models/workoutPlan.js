const mongoose = require('mongoose')

const exerciseSchema = new mongoose.Schema({
	type: String,
	activity: String,
	description: String
})

const commentSchema = new mongoose.Schema({
	comment: String
})

const workoutPlanSchema = new mongoose.Schema({
	userId: String,
	goalType: String,
	current: Number,
	goal: Number,
	exercises: [exerciseSchema],
	public: Boolean,
	comments: [commentSchema]
})


module.exports = mongoose.model('WorkoutPlan', workoutPlanSchema)