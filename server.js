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

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

// Cross Origin Resource Sharing
const corsOptions = {
	origin: 'http://localhost:3000',
	credentials: true,
	optionsSuccessStatus: 200
}

// CORS is set up as middleware so that any client can make a request to our server
app.use(cors(corsOptions))

const userController = require('./controllers/userController')
app.use('/user', userController)

const workoutPlanController = require('./controllers/workoutPlanController')
app.use('/plan', workoutPlanController)

const exerciseController = require('./controllers/exerciseController')
app.use('/exercise', exerciseController)


app.listen(process.env.PORT || 9000, () => {
	console.log('Listening on port 9000');
})