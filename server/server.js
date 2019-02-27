const express = require('express')
const bodyParser = require('body-parser')
const _ = require('lodash')
const morgan = require('morgan')

const lionRouter = require('./lion')
const tigerRouter = require('./tigers')

const app = express()

app.use(morgan('dev'))
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

app.use('/lions', lionRouter)
app.use('/tigers', tigerRouter)

app.use((error, req, res, next) => {
    if(error){
        console.log('Error' + error.message)
        res.status(500).send(error)
    }
})

module.exports = app