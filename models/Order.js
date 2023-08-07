const { Schema, model } = require("mongoose")
//Створення нової схеми
const Order = new Schema({
    fullName: { type: String, require: true },
    PhoneNumber: { type: String, require: true },
    City: { type: String, require: true },
    PostOffice: { type: String, require: true },
    SerialNumber: { type: String, require: true },
    DateOfBuy: { type: String, require: true },
    UserEmail: { type: String, require: true },
    BuyedMoto: { type: Array, require: true },
    AllPrice: { type: Number, require: true },
    CreditCard: { type: String, require: true }
})

module.exports = model("Order", Order)