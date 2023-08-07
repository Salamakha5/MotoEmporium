const Router = require("express")
const News = require("../models/News.js")

const router = Router()

router.get("/getAllNews",async (req,res)=>{
    const news = await News.find({})
    res.status(200).json(news)
})

module.exports = router
 