const express = require("express")
const app=express();
const port = process.env.PORT||5000;
const {db} = require("./db/config");
const bodyParser = require("body-parser");
const cors = require("cors");

const userRoute = require("./routes/userRoute")
const productsRoute = require("./routes/productsRoute");
const bidsRoute = require("./routes/bidsRoute")
const noticeRoute = require("./routes/noticeRoute")
//middlewares
// app.use(cors(corsOptions))
// var corsOptions={
//     origin:"http://localhost:3000"
// }

app.use(express.json())
app.use(bodyParser.urlencoded({extended:true}))

app.use("/api/users",userRoute)
app.use("/api/products",productsRoute);
app.use("/api/bids",bidsRoute);
app.use("/api/notifications",noticeRoute)

require("dotenv").config();


const server = ()=>{
    db()
    app.listen(port,()=>{
        console.log(`Node JS Server started on port ${port}`);
    })
    app.on('error',console.error.bind(console,"MongoDB connection error"))
}
server()