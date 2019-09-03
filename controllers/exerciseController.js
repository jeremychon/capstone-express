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



module.exports = router