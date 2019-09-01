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
				message: 'All plans found successful',
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
				message: 'Plan created successful',
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
router.get('/:id', async (req, res, next) => {
	console.log(req.params, '<--- req.params');
	try {
		const foundPlan = await WorkoutPlan.findById(req.params.id)

		res.json({
			status: {
				code: 200,
				message: 'Plan found successful',
				data: foundPlan
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


// UPDATE
router.put('/:id', async (req, res, next) => {
	try {
		const updatedPlan = await WorkoutPlan.findByIdAndUpdate(req.params.id, req.body, {new: true})

		res.json({
			status: {
				code: 200,
				message: 'Plan updated successful',
				data: updatedPlan
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


// DELETE




module.exports = router




