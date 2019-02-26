const express = require('express')
const bodyParser = require('body-parser')
const _ = require('lodash')

const app = express()

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

const lions = []
var id = 0

app.get('/lions', (req, res) => {
    res.json(lions)
})

app.get('/lions/:id', (req, res) => {
    const lion = _.find(lions, { id: req.params.id })
    res.json(lion || {})
})

app.post('/lions', (req, res) =>  {
    let lion = req.body
    id++ 
    lion.id = id.toString()
    lions.push(lion)
    res.json(lion)
})

app.put('/lions/:id', (req, res) => {
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

app.delete('/lions/:id', (req, res) => {
    const lion = _.findIndex(lions, { id: req.params.id })
    if(!lions[lion]){
        res.send()
    } else {
        const deletedLion = lions[lion] 
        lions.splice(lion, 1)
        res.json(deletedLion)
    }
})

const port = 3000
app.listen(port, () => console.log(`Listem on port ${port}`))