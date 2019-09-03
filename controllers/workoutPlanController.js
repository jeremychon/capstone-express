const express = require('express')
const router = express.Router()
const WorkoutPlan = require('../models/workoutPlan')


// GET ALL PLANS
router.get('/', async (req, res, next) => {
	try {
		const allPlans = await WorkoutPlan.find({})

		res.status(200).json({
			success: true,
			code: 200,
			message: 'Found all plans successfully',
			data: allPlans
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
		console.log(req.session, '<--- session');
		const createdPlan = await WorkoutPlan.create(req.body)
		createdPlan.userId = req.session.userId
		console.log(createdPlan, '<---- createdPlan');

		res.status(200).json({
			success: true,
			code: 200,
			message: 'Created plan successfully',
			data: createdPlan
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

		res.status(200).json({
			success: true,
			code: 200,
			message: 'Show plan successfully',
			data: foundPlan
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

		res.status(200).json({
			success: true,
			code: 200,
			message: 'Updated plan successfully',
			data: allPlans
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
router.delete('/:id', async (req, res, next) => {
	try {
		const deletedPlan = await WorkoutPlan.findByIdAndRemove(req.params.id)

		res.status(200).json({
			success: true,
			code: 200,
			message: 'Deleted plan successfully',
			data: deletedPlan
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



module.exports = router


