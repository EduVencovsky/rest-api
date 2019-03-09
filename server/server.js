const express = require('express')
const app = express()
const api = require('./api')
const config = require('./config/config')

// connect to mongodb
require('mongoose').connect(config.db.url, { useCreateIndex: true, useNewUrlParser: true })

// setup app middleware
require('./middleware/appMiddleware')(app)

// setup api router
app.use('/api', api)

module.exports = app
