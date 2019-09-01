const express = require('express')
const router = express.Router()
const WorkoutPlan = require('../models/workoutPlan')


// GET ALL PLANS
router.get('/', async (req, res, next) => {
	try {
		const allPlans = await WorkoutPlan.find({})

		res.json({
			status: {
				code: 200,
				message: 'Found all plans',
				data: allPlans
			}
		})
		
	} catch (err) {
		res.status(500).json({
			success: false,
			code: 500,
			message: 'Internal Server Error',
			error: err
		})
	}
})


// CREATE
router.post('/', async (req, res, next) => {
	try {
		const createdPlan = await WorkoutPlan.create(req.body)
		console.log(createdPlan, '<---- createdPlan');

		res.json({
			status: {
				code: 200,
				message: 'Create plan successful',
				data: createdPlan
			}
		})
	} catch (err) {
		res.status(500).json({
			success: false,
			code: 500,
			message: 'Internal Server Error',
			error: err
		})
	}
})


// SHOW



// UPDATE



// DELETE




module.exports = router




