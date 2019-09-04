const mongoose = require('mongoose')


const workoutPlanSchema = new mongoose.Schema({
	userId: String,
	goalType: {
		type: String,
		enum: ['Weight Loss', 'Strength']
	},
	current: Number,
	goal: Number,
	public: Boolean
})


module.exports = mongoose.model('WorkoutPlan', workoutPlanSchema)