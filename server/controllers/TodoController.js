const Todo = require('../models/Todo')
const jwtDecode = require('jwt-decode')

const addTodo = function(req,res){
    const {username,title,description} = req.body
    if(username==null||title==null||description==null){
        console.log("Enter all fields!")
        return res.json({message:"Enter all fields!"})
    }
    Todo.create({
        username:username,
        title:title,
        description:description
    }).then(()=>{
        console.log(`Todo ${title} inserted!`)
        return res.json({message:`Todo Inserted!`})
    })
}
const deleteTodo = function(req,res){
    const {username,title,description} = req.body
    Todo.deleteOne({
        username:username,
        title:title,
        description:description
    }).then(()=>{
        console.log(`Todo ${title} deleted!`)
        return res.json({message:`Todo Deleted!`})
    })
}
const getTodos = function(req,res){
    const {username,title,description} = req.body
    Todo.find({
        username:username
    }).then((response)=>{
        return res.json({message:`Todos Gotten`,todos:response})
    })
}

module.exports = {
    addTodo,
    deleteTodo,
    getTodos
}