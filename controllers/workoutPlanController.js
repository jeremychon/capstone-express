const express = require('express')
const router = express.Router()
const WorkoutPlan = require('../models/workoutPlan')
const Exercise = require('../models/exercise')


// GET ALL PLANS
router.get('/', async (req, res, next) => {
	try {
		const allPlans = await WorkoutPlan.find({}).populate('user')

		res.status(200).json({
			success: true,
			code: 200,
			message: 'Found all plans successfully',
			data: allPlans
		})
	} catch (err) {
		next(err)
	}
})


// CREATE
router.post('/', async (req, res, next) => {
	try {
		const createdPlan = await WorkoutPlan.create({
			goalType: req.body.goalType,
			current: req.body.current,
			goal: req.body.goal,
			public: req.body.public,
			user: req.session.userId
		})

		res.status(200).json({
			success: true,
			code: 200,
			message: 'Created plan successfully',
			data: createdPlan
		})

	} catch (err) {
		next(err)
	}
})


// SHOW
router.get('/:id', async (req, res, next) => {
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
			data: updatedPlan
		})
	} catch (err) {
		next(err)
	}
})


// DELETE
router.delete('/:id', async (req, res, next) => {
	try {
		const deletedPlan = await WorkoutPlan.findByIdAndRemove(req.params.id)

		const deletedExercises = await Exercise.deleteMany({planId: req.params.id})

		res.status(200).json({
			success: true,
			code: 200,
			message: 'Deleted plan successfully',
			data: deletedPlan
		})
	} catch (err) {
		next(err)
	}
})



module.exports = router


