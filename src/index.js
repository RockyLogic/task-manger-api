const express = require("express")
require("./db/mongoose") //Runs file starts connection
const userRouter = require("./routers/user")
const taskRouter = require("./routers/task")

const app = express()
const port = process.env.PORT;

//middle ware demo
// app.use((req,res,next)=>{
//     res.status(503).send("NOpe bitch")
// })

app.use(express.json())
app.use(userRouter) //User Routes
app.use(taskRouter) //Task Routes

app.listen(port, ()=>{
    console.log("[Server] Started On Port:", port);
})
