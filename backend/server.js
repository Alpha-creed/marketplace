const express = require("express")
const app=express();
const port = process.env.PORT||5000;
const {db} = require("./db/config");
const bodyParser = require("body-parser");
const cors = require("cors");
const userRoute = require("./routes/userRoute")

//middlewares
// app.use(cors(corsOptions))
app.use(express.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use("/api/users",userRoute)

// var corsOptions={
//     origin:"http://localhost:3000"
// }


require("dotenv").config();


const server = ()=>{
    db()
    app.listen(port,()=>{
        console.log(`Node JS Server statred on port ${port}`);
    })
    app.on('error',console.error.bind(console,"MongoDB connection error"))
}
server()