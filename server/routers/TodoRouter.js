const router = require('express').Router()
const TodoController = require('../controllers/TodoController')
const verifyJWT = require("../middlewares/verifyJWT")

router.use(verifyJWT)

router.post("/addTodo",TodoController.addTodo)
router.post("/deleteTodo",TodoController.deleteTodo)
router.post("/getTodos",TodoController.getTodos)

module.exports = router