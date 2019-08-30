require('dotenv').config()

const express 	 = require('express')
const app	  	 = express()
const bodyParser = require('body-parser')
const cors 		 = require('cors')
const session 	 = require('express-session')

require('./db/db')

app.use(session({
	secret: process.env.SECRET_KEY,
	resave: false,
	saveUninitialized: false
}))





app.listen(process.env.PORT || 9000, () => {
	console.log('Listening on port 9000');
})