const express = require("express")
const config = require("config")
const mongoose = require("mongoose")
const app = express()
require('dotenv').config()
const User = require("./models/User.js")




const PORT = process.env.PORT || 4000

app.post("/registration",async(req,res)=>{
    try {
        const user = User({email:"test121@gmail.com",password:"VladFjajs"})
        await user.save()
        return res.json({massage:"Створено нового юзера"})
    } catch (e) {
        res.json({massage:"Error Registration"})
    }
})

app.use("/about",(req,res)=>{
    res.json({massage:"About Page"})
})

const start = async ()=>{
    try {
    await mongoose.connect(process.env.URL_MONGO_DB).then(()=>{
        console.log("MongoDB Connect");
    })
    app.listen(PORT,()=>{
        console.log("Server Run PORT-"+PORT);
    })
    } catch (e) {
        console.log(e);
    }
}
start()