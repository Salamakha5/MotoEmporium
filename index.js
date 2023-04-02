const express = require("express")
const config = require("config")
const mongoose = require("mongoose")
const app = express()
require('dotenv').config()
const PORT = process.env.PORT || 4000

app.use("/home",(req,res)=>{
    res.json({massage:"Home Page"})
})

app.use("/about",(req,res)=>{
    res.json({massage:"About Page"})
})

const start= async ()=>{
    try {
    console.log(PORT);
    
    app.listen(PORT,()=>{
        console.log("Server Run PORT-"+PORT);
    })
    } catch (e) {
        console.log(e);
    }
}
start()