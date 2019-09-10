const mongoose = require('mongoose')
// const profilePicSchema = require('./profilePic')

const UserSchema = new mongoose.Schema({
	firstName: String,
	lastName: String,
	email: String,
	password: String
})


module.exports = mongoose.model('User', UserSchema)