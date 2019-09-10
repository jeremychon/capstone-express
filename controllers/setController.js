const express = require('express')
const router = express.Router()
const Sets = require('../models/set')

// CREATE SET
router.post('/', async (req, res, next) => {
	try {
		const createdSet = await Sets.create(req.body)

		res.status(200).json({
			success: true,
			code: 200,
			message: 'Created set successfully',
			data: createdSet
		})
	} catch (err) {
		next(err)
	}
})

// GET SETS
router.get('/', async (req, res, next) => {
	try {
		const allSets = await Sets.find({})

		res.status(200).json({
			success: true,
			code: 200,
			message: 'Found all sets successfully',
			data: allSets
		})
	} catch (err) {
		next(err)
	}
})

// UPDATE SETS
router.put('/:id', async (req, res, next) => {
	try {
		const updatedSet = await Sets.findByIdAndUpdate(req.params.id, req.body, {new: true})

		res.status(200).json({
			success: true,
			code: 200,
			message: 'Updated set successfully',
			data: updatedSet
		})
	} catch (err) {
		next(err)
	}
})


// DELETE SETS
router.delete('/:id', async (req, res, next) => {
	try {
		const deletedSet = await Sets.findByIdAndRemove(req.params.id)

		res.status(200).json({
			success: true,
			code: 200,
			message: 'Deleted set successfully',
			data: deletedSet
		})

	} catch (err) {
		next(err)
	}
})

module.exports = router