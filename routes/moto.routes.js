const Router = require("express")
const Moto = require("../models/Moto.js")

const router = Router()

router.get("/getAllMoto",async (req,res)=>{
    const moto = await Moto.find({})
    res.status(200).json(moto)
})
router.post("/getMotoById",async (req,res)=>{
    const moto = await Moto.findOne({_id:req.body.id})
    res.status(200).json(moto)
})


module.exports = router
 
