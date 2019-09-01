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
router.get('/login', async (req, res, next) => {
	try {
		// making all email domains lowercase (anything after the '@')
		const splitEmail = req.body.email.split('@')
		const domain = splitEmail[1].toLowerCase()
		const joinEmail = splitEmail[0] + '@' + domain

		const foundUser = await User.findOne({email: joinEmail})
		console.log('======');
		console.log(foundUser, '<--- logged user (foundUser)');
		console.log('======');

		// if there's a user in the db
		if (foundUser) {

			// check to see if the password is correct
			// bcrypt compare returns true || false
			if (bcrypt.compareSync(req.body.password, foundUser.password)) {
				req.session.userId = foundUser._id;
				req.session.firstName = foundUser.firstName;
				req.session.lastName = foundUser.lastName;
				req.session.logged = true;

				res.json({
					status: {
						code: 200,
						message: 'User logged in',
						data: foundUser
					}
				})
			} else {
				res.json({
					status: 200,
					message: 'Incorrect email or password'
				})
			}
		} else {
			res.json({
				status: {
					code: 200,
					message: 'Incorrect email or password'
				}
			})
		}
	} catch (err) {
		res.status(500).json({
			success: false,
			code: 500,
			message: 'Internal Server Error',
			error: err
		})
	}
})

// LOGOUT
router.get('/logout', async (req, res, next) => {
	
	req.session.destroy((err) => {
		if (err) {
			res.status(500).json({
				success: false,
				code: 500,
				message: 'Internal Server Error',
				error: err
			})
		} else {
			res.status(200).json({
				success: true,
				code: 200,
				message: 'User logged out',
			})
		}
	})
})

// REGISTER
router.post('/register', async (req, res, next) => {

	try {
		// making all email domains lowercase
		const splitEmail = req.body.email.split('@')
		const domain = splitEmail[1].toLowerCase()
		const joinEmail = splitEmail[0] + '@' + domain

		const existingUser = await User.findOne({email: joinEmail})

		// checking if a user exists
		if (existingUser) {
			res.status(200).json({
				success: false,
				code: 200,
				message: 'User with that email already exists'
			})
		} else {
			// hash password
			const hashedPassword = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10))
			
			// create a new user
			const registerUser = await User.create({
				username: req.body.username,
				email: joinEmail,
				password: hashedPassword
			});
			console.log('======');
			console.log(registerUser, '<--- registered user (registerUser)');
			console.log('======');

			// set info on the session
			req.session.userId = registerUser._id;
			req.session.firstName = registerUser.firstName;
			req.session.lastName = registerUser.lastName;
			req.session.logged = true;

			res.json({
				status: {
					code: 200,
					message: 'User registered',
					data: registerUser
				}
			})

		}
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










