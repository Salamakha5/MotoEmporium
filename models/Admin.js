const {Schema, model,ObjectId} = require("mongoose")
//Створення нової схеми
const Admin = new Schema({
    email:{type:String,require:true,unique:true},
})

module.exports = model("Admin",Admin)