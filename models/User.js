const {Schema, model,ObjectId} = require("mongoose")
//Створення нової схеми
const User = new Schema({
    name:{type:String,require:true},
    email:{type:String,require:true,unique:true},
    password:{type:String,require:true},
})

module.exports = model("User",User)