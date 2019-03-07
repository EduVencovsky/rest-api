const express = require('express')
const app = express()
const api = require('./api')

// setup app middleware
require('./middleware/appMiddleware')(app)

// setup api router
app.use('/api', api)

module.exports = app