const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/weightmate', {
	useNewUrlParser: true,
	useCreateIndex: true,
	useFindAndModify: false
})

mongoose.connection.on('connected', () => {
	console.log('Mongoose is connected');
})

mongoose.connection.on('disconnected', () => {
	console.log('Mongoose is disconnected');
})

mongoose.connection.on('error', (err) => {
	console.log(err, 'Mongoose failed to connect');
})