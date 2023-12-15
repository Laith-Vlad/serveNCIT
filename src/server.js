'use strict'
// requiring Main libraries
const express = require('express')
const cors = require('cors')

// requiring middleware and routes

const logger = require('./middleware/logger');
const handle404 = require('./error-handlers/404');
const handle500 = require('./error-handlers/500');
const authRouter = require('./routes/auth');
const router = require('../src/routes/modelRoute')

// initiating the express app

const app = express();

// using app middleware

app.use(cors());
app.use(express.json()) // recognize the incoming Request Object as a JSON Object.
app.use(express.urlencoded({ extended: true })); // recognize the incoming Request Object as strings or arrays

// Logger
app.use(logger);

// Routers
app.get('/',handleHome)
app.use(authRouter)


//Error handlers 

app.use(handle404)
app.use(handle500)


function handleHome (req,res) {
    res.status(200).json({
        Message: "Welcome to school"
    })
}
module.exports = {
    app,
    start: (port) => {
        app.listen(port, ()=> console.log(`Up and Running on Port : ${port}`))
    }
}

