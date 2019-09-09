const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
	firstName: String,
	lastName: String,
	email: String,
	password: String,
	image: {
		data: Buffer,
		contentType: String
	}
})


module.exports = mongoose.model('User', UserSchema)