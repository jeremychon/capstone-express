const mongoose = require('mongoose')
// const profilePicSchema = require('./profilePic')

const UserSchema = new mongoose.Schema({
	firstName: String,
	lastName: String,
	email: String,
	password: String,
	profilePic: { type: mongoose.Schema.Types.ObjectId, ref: 'ProfilePic' }
})


module.exports = mongoose.model('User', UserSchema)