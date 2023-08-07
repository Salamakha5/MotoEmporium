const { Schema, model } = require("mongoose")
//Створення нової схеми
const Moto = new Schema({
    brand:{type:String,require:true},
    model:{type:String,require:true},
    price:{type:Number,require:true},
    imgURL:{type:Array,require:true},
    collectionType:{type:String,require:true},
    displacement:{type:String},
    borexStroke:{type:String}, 
    compressionRatio:{type:String},
    horsepower:{type:String},
    torque:{type:String},
    fuelSystem:{type:String},
    gearbox:{type:String},
})

module.exports = model("Moto",Moto)