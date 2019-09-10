const mongoose = require('mongoose')

// let connectionString

// if (process.env.NODE_ENV == 'production') {
// 	connectionString = process.env.DATABASE_URL
// } else {
// 	connectionString = 'mongodb://localhost/weightmate'
// }

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