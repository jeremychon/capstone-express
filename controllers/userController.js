const express 	  = require('express')
const router 	  = express.Router()
const User 		  = require('../models/user')
const WorkoutPlan = require('../models/workoutPlan')
const ProfilePic  = require('../models/profilePic')
const bcrypt 	  = require('bcryptjs')
const multer 	  = require('multer')
const fs 		  = require('fs')
const upload 	  = multer({ dest: 'uploads/'})
// const storage = multer.memoryStorage()
// const upload = multer({ storage: storage })

// LOGIN
router.post('/login', async (req, res, next) => {
	try {
		// making all email domains lowercase (anything after the '@')
		const splitEmail = req.body.email.split('@')
		const domain = splitEmail[1].toLowerCase()
		const joinEmail = splitEmail[0] + '@' + domain

		const foundUser = await User.findOne({email: joinEmail})

		// if there's a user in the db
		if (foundUser) {

			// check to see if the password is correct
			// bcrypt compare returns true || false
			if (bcrypt.compareSync(req.body.password, foundUser.password)) {
				req.session.userId = foundUser._id;
				req.session.firstName = foundUser.firstName;
				req.session.lastName = foundUser.lastName;
				req.session.logged = true;

				res.status(200).json({
					success: true,
					code: 200,
					message: 'User login successful',
					data: foundUser
				})
			} else {
				res.status(401).json({
					success: false,
					code: 401,
					message: 'Incorrect email or password',
				})
			}
		} else {
			res.status(401).json({
				success: false,
				code: 401,
				message: 'Incorrect email or password',
			})
		}
	} catch (err) {
		next(err)
	}
})

// LOGOUT
router.post('/logout', async (req, res, next) => {
	
	req.session.destroy((err) => {
		if (err) {
			next(err)
		} else {
			res.status(200).json({
				success: true,
				code: 200,
				message: 'User logged out'
			})
		}
	})
})

// REGISTER
router.post('/register', upload.single('profPic'), async (req, res, next) => {

	try {
		console.log(req.file, '<---- req.file');
		// making all email domains lowercase
		const splitEmail = req.body.email.split('@')
		const domain = splitEmail[1].toLowerCase()
		const joinEmail = splitEmail[0] + '@' + domain

		const existingUser = await User.findOne({email: joinEmail})

		// checking if a user exists
		if (existingUser) {
			res.status(401).json({
				success: false,
				code: 401,
				message: 'User with that email already exists'
			})
		} else {
			const filePath = './uploads/' + req.file.filename
			const profPic = new ProfilePic;
			// const img = {
			// 	data: fs.readFileSync(filePath),
			// 	contentType: req.file.mimetype
			// }
			profPic.img.data = fs.readFileSync(filePath)
			profPic.img.contentType = req.file.mimetype

			await profPic.save()

			fs.unlinkSync(filePath)
			// hash password
			const hashedPassword = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10))
			
			// create a new user
			const registerUser = await User.create({
				firstName: req.body.firstName,
				lastName: req.body.lastName,
				email: joinEmail,
				password: hashedPassword,
				profPic: profPic
			});

			// fs.unlinkSync(filePath)

			// set info on the session
			req.session.userId = registerUser._id;
			req.session.firstName = registerUser.firstName;
			req.session.lastName = registerUser.lastName;
			req.session.logged = true;

			res.status(200).json({
				success: true,
				code: 200,
				message: 'User register successful',
				data: registerUser
			})
		}

	} catch (err) {
		next(err)
	}
})


// ALL USERS
router.get('/', async (req, res, next) => {
	try {
		const allUsers = await User.find({})

		res.status(200).json({
			success: true,
			code: 200,
			message: 'Found all users successful',
			data: allUsers
		})
	} catch (err) {
		next(err)
	}
})


// SHOW USER
router.get('/:id', async (req, res, next) => {
	try {
		const foundUser = await User.findById(req.params.id)
		const userPlans = await WorkoutPlan.find({user: req.params.id})

		res.status(200).json({
			success: true,
			code: 200,
			message: 'Found specific user successfully',
			userData: foundUser,
			plans: userPlans
		})
	} catch (err) {
		next(err)
	}
})


// DELETE USER
router.delete('/:id', async (req, res, next) => {
	try {
		const deletedUser = await User.findByIdAndRemove(req.params.id)

		res.status(200).json({
			success: true,
			code: 200,
			message: 'Deleted user successfully',
			data: deletedUser
		})
	} catch (err) {
		next(err)
	}
})



module.exports = router





