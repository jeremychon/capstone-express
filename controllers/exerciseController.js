const express = require('express')
const router = express.Router()
const Exercise = require('../models/exercise')


// CREATE
router.post('/', async (req, res, next) => {
	try {
		const createdExercise = await Exercise.create(req.body)
		console.log(createdExercise, '<---- createdExercise');

		res.json({
			status: {
				code: 200,
				message: 'Exercise created successful',
				data: createdExercise
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
router.delete('/:id', async (req, res, next) => {
	try {
		const deletedExercise = await Exercise.findByIdAndRemove(req.params.id)

		res.json({
			status: {
				code: 200,
				message: 'Exercise deleted',
				data: deletedExercise
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
		const updatedExercise = await Exercise.findByIdAndUpdate(req.params.id)
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