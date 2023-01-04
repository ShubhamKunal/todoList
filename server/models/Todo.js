const mongoose = require('mongoose')
mongoose.set('strictQuery', false);
mongoose.connect('mongodb+srv://shubhamkunal:zac@cluster0.7t8gyby.mongodb.net/todoList');

const TodoSchema = new mongoose.Schema({
    username: String,
    title: String,
    description:String
})

const Todo = mongoose.model("Todos",TodoSchema)

module.exports = Todo
