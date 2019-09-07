const mongoose = require('mongoose')


const workoutPlanSchema = new mongoose.Schema({
	user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
	goalType: {
		type: String,
		enum: ['Weight loss', 'Strength']
	},
	current: Number,
	goal: Number,
	purpose: String,
	public: Boolean
})


module.exports = mongoose.model('WorkoutPlan', workoutPlanSchema)