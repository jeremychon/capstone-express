const express = require('express')
const router = express.Router()
const Comment = require('../models/comment')


// CREATE
router.post('/', async (req, res, next) => {
	try {
		const createdComment = await Comment.create(req.body)

		res.status(200).json({
			success: true,
			code: 200,
			message: 'Created comment successfully',
			data: createdComment
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
		const deletedComment = await Comment.findByIdAndRemove(req.params.id)

		res.status(200).json({
			success: true,
			code: 200,
			message: 'Deleted comment successfully',
			data: deletedComment
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
		const updatedComment = await Comment.findByIdAndUpdate(req.params.id, req.body, {new: true})

		res.status(200).json({
			success: true,
			code: 200,
			message: 'Updated comment successfully',
			data: updatedComment
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


