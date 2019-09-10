const express = require('express')
const router = express.Router()
const Comment = require('../models/comment')


// CREATE
router.post('/:planId', async (req, res, next) => {
	try {
		const createdComment = await Comment.create({
			user: req.session.userId,
			planId: req.params.planId,
			comment: req.body.comment
		})

		res.status(200).json({
			success: true,
			code: 200,
			message: 'Created comment successfully',
			data: createdComment
		})
	} catch (err) {
		next(err)
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
		next(err)
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
		next(err)
	}
})



module.exports = router



