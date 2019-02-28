const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/pie', { useNewUrlParser: true })

const TodoSchema = new mongoose.Schema({
    name: String,
    completed: Boolean,
})

const Todo = mongoose.model('users', TodoSchema)
Todo.create({
    name: 'eduuu', 
    completed: true 
})
.then((error, res) => {
    console.log(error, res)
})