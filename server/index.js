const express = require('express')
const app = express()
const cors = require('cors')
const cookieParser = require('cookie-parser')
require('dotenv').config()
const UserRouter = require('./routers/UserRouter')
const TodoRouter = require('./routers/TodoRouter')
app.use(cors({origin:["https://todo-p28e.onrender.com"],credentials:true}))
app.use(express.json())
app.use(cookieParser())
app.use("/",UserRouter)
app.use("/",TodoRouter)
app.listen(process.env.PORT,()=>{
    console.log(`Server is listening at PORT: ${process.env.PORT}`)
})
