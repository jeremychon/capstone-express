const mongoose = require('mongoose')


const workoutPlanSchema = new mongoose.Schema({
	userId: String,
	goalType: {
		type: String,
		enum: ['Weight loss', 'Strength']
	},
	current: Number,
	goal: Number,
	public: Boolean
})


module.exports = mongoose.model('WorkoutPlan', workoutPlanSchema)