const mongoose = require('mongoose')
mongoose.set('strictQuery', false);
mongoose.connect('mongodb://127.0.0.1:27017/todoList');

const TodoSchema = new mongoose.Schema({
    username: String,
    title: String,
    description:String
})

const Todo = mongoose.model("Todos",TodoSchema)

module.exports = Todo