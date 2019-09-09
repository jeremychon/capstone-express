const express = require('express')
const router = express.Router()
const Exercise = require('../models/exercise')
const Sets = require('../models/set')


// GET ALL
router.get('/', async (req, res, next) => {
	try {
		const allExercises = await Exercise.find({})

		res.status(200).json({
			success: true,
			code: 200,
			message: 'Found all exercises',
			data: allExercises
		})
	} catch (err) {
		next(err)
	}
})

// CREATE
router.post('/', async (req, res, next) => {
	try {
		const createdExercise = await Exercise.create(req.body)

		res.status(200).json({
			success: true,
			code: 200,
			message: 'Created exercise successfully',
			data: createdExercise
		})
	} catch (err) {
		next(err)
	}
})


// DELETE
router.delete('/:id', async (req, res, next) => {
	try {
		const deletedExercise = await Exercise.findByIdAndRemove(req.params.id)
		const deletedSets = await Sets.deleteMany({exerciseId: req.params.id})

		res.status(200).json({
			success: true,
			code: 200,
			message: 'Deleted exercise successfully',
			data: deletedExercise
		})
	} catch (err) {
		next(err)
	}
})


// UPDATE
router.put('/:id', async (req, res, next) => {
	try {
		const updatedExercise = await Exercise.findByIdAndUpdate(req.params.id, req.body, {new: true})

		res.status(200).json({
			success: true,
			code: 200,
			message: 'Updated exercise successfully',
			data: updatedExercise
		})
	} catch (err) {
		next(err)
	}
})



module.exports = router



