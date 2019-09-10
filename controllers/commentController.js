const express = require('express')
const router = express.Router()
const Comment = require('../models/comment')



// FIND ALL COMMENTS FOR PLAN
router.get('/:planId', async (req, res, next) => {
	try {
		const foundComments = await Comment.find({planId: req.params.planId}).populate('user')
		console.log(foundComments, '<---- foundComments in get route');

		res.status(200).json({
			success: true,
			code: 200,
			message: 'Found comments successfully',
			data: foundComments
		})
	} catch (err) {
		next(err)
	}
})


// CREATE
router.post('/:planId', async (req, res, next) => {
	try {
		const createdComment = await Comment.create({
			user: req.session.userId,
			planId: req.params.planId,
			comment: req.body.comment
		})
		console.log(createdComment, '<-- createdComment');

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



