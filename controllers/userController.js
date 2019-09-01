const express = require('express')
const router = express.Router()
const User = require('../models/user')
const bcrypt = require('bcryptjs')

// ALL USERS
// router.get('/user/all', async (req, res, next) => {
// 	try {
// 		const allUsers = await User.find({})
// 		console.log(allUsers);


// 	} catch (err) {
// 		next(err)
// 	}
// })

// LOGIN

// LOGOUT

// REGISTER
router.post('/register', async (req, res, next) => {



	try {
		const lowerEmail = req.body.email.toLowerCase()
		req.body.email = lowerEmail
		console.log(req.body, '<---- req.body');

		const existingUser = await User.findOne({email: req.body.email})
		if (existingUser) {
			res.status(200).json({
				success: false,
				code: 200,
				message: 'User with that email already exists'
			})
		} else {
			const hashedPassword = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10))
			console.log(hashedPassword, '<--- hashedPassword');

			req.body.email.toLowerCase()
			
			const registerUser = await User.create({
				username: req.body.username,
				email: req.body.email,
				password: hashedPassword
			});
			console.log(registerUser, '<--- registerUser');

			// set info on the session
			req.session.userId = registerUser._id;
			req.session.username = registerUser.username;
			req.session.logged = true;

			res.json({
				status: {
					code: 200,
					message: 'User register successful'
				}
			})

		}
	} catch (err) {
		next(err)
	}
})



module.exports = router










