const { Schema, model } = require("mongoose")
//Створення нової схеми
const News = new Schema({
    header:{type:Object,require:true},
    img:{type:String,require:true},
    text:{type:Object,require:true},
    status:{type:Number,require:true},
    data:{type:String,require:true},
    indexData:{type:Number,require:true}
})

module.exports = model("News",News)
