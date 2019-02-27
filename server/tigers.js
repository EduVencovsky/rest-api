const tigerRouter = require('express').Router()
const _ = require('lodash')

const tigers = []
var id = 0

const updateId = (req, res, next) => {
    id++
    req.body.id = id + ''
    next()
}

tigerRouter.param('id', (req, res, next, paramId) => {
    const tiger = _.find(tigers, { id: paramId })
    if(tiger) {
        req.tiger = tiger 
        next()
    } else {
        res.status(404).send()
    }
})

tigerRouter.get('/', (req, res) => {
    res.json(tigers)
})

tigerRouter.get('/:id', (req, res) => {
    res.json(req.tiger)
})

tigerRouter.post('/', updateId, (req, res) =>  {
    let tiger = req.body
    tigers.push(tiger)
    res.json(tiger)
})

tigerRouter.put('/:id', (req, res) => {
    let update = req.body

    if(update.id) delete update.id

    const tiger = _.findIndex(tigers, { id: req.params.id })

    if(!tigers[tiger]){
        res.send()
    } else {
        const updatedtiger = _.assign(tigers[tiger], update)
        res.json(updatedtiger)
    }
})

tigerRouter.delete('/:id', (req, res) => {
    const tiger = _.findIndex(tigers, { id: req.params.id })
    if(!tigers[tiger]){
        res.send()
    } else {
        const deletedtiger = tigers[tiger] 
        tigers.splice(tiger, 1)
        res.json(deletedtiger)
    }
})


module.exports = tigerRouter