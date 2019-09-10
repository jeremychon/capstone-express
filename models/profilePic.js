const mongoose = require('mongoose')

const profilePicSchema = new mongoose.Schema({
	img: {
		data: Buffer,
		contentType: String
	}
})

module.exports = mongoose.model('ProfilePic', profilePicSchema)