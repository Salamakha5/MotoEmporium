const express = require("express")
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const PORT = process.env.PORT || 4000
const authRouter = require("./routes/auth.routes.js")
const motoRouter = require("./routes/moto.routes.js")
const newsRouter = require("./routes/news.routes.js")
const orderRouter = require("./routes/order.routes.js")
const adminRouter = require("./routes/admin.routes.js")
const cors = require("./middlewere/cors.middlewere.js")
const app = express()
dotenv.config()
app.use(cors)
app.use(express.json())

// Roures
app.use("/api",motoRouter)  
app.use("/api",authRouter) 
app.use("/api",newsRouter) 
app.use("/api",orderRouter) 
app.use("/api",adminRouter) 
// Roures

const start = async ()=>{
    try{
        // підключення до ДБ
        await mongoose.connect(process.env.MONGODB_URL).then(()=>{
            console.log("DB connect");
        })
        app.listen(PORT,(e)=>{
            //Перевірка на помилки
            if(e)return console.log("Server Error");
            console.log("Server Start PORT: "+PORT);
        })        
    }catch(error){
        console.log("catch "+error);
    }
}
start()