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
		console.log(allSets, '<---- all sets');

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


module.exports = router