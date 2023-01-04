const mongoose = require('mongoose')
mongoose.set('strictQuery', false);
mongoose.connect('mongodb+srv://shubhamkunal:zac@cluster0.7t8gyby.mongodb.net/todoList');

const UserSchema = new mongoose.Schema({
    username: {type:String,unique:true, required:true,maxLength:12},
    email: {type:String,unique:true, required:true},
    password: {type:String, required:true},
})

const User = mongoose.model("todoList-User",UserSchema)

module.exports = User
