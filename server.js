const express = require('express')

const app = express()

const jsonData = {count: 312, message: 'hey'}

app.get('/', (req, res) => {
    res.json(jsonData)
})

app.get('/data', (req, res) => {
    res.json(jsonData)
})

const port = 3000
app.listen(port, () => console.log(`Listem on port ${port}`))