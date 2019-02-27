const lionRouter = require('express').Router()
const _ = require('lodash')

const lions = []
var id = 0

const updateId = (req, res, next) => {
    id++
    req.body.id = id + ''
    next()
}

lionRouter.param('id', (req, res, next, paramId) => {
    const lion = _.find(lions, { id: paramId })
    if(lion) {
        req.lion = lion 
        next()
    } else {
        res.status(404).send()
    }
})

lionRouter.route('/')
    .get((req, res) => {
        res.json(lions)
    })
    .post(updateId, (req, res) =>  {
        let lion = req.body
        lions.push(lion)
        res.status(201).json(lion)
    })

lionRouter.route('/:id')
    .get((req, res) => {
        res.json(req.lion)
    })
    .put((req, res) => {
        let update = req.body
    
        if(update.id) delete update.id
    
        const lion = _.findIndex(lions, { id: req.params.id })
    
        if(!lions[lion]){
            res.send()
        } else {
            const updatedLion = _.assign(lions[lion], update)
            res.json(updatedLion)
        }
    })
    .delete((req, res) => {
        const lion = _.findIndex(lions, { id: req.params.id })
        if(!lions[lion]){
            res.send()
        } else {
            const deletedLion = lions[lion] 
            lions.splice(lion, 1)
            res.json(deletedLion)
        }
    })

module.exports = lionRouter