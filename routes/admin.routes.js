const Router = require("express")
const Admin = require("../models/Admin.js")
const Moto = require("../models/Moto.js")
const News = require("../models/News.js")
const { body } = require("express-validator")

const router = Router()

const IsAdminByEmail = async (email) => {
    return await Admin.findOne({ email: email }) ? true : false

}


// admin
router.post("/isAdmin", async (req, res) => {
    try {
        if(await IsAdminByEmail(req.body.email)){
            res.status(200).json({ massage: await IsAdminByEmail(req.body.email) })
        }
        else{
            res.status(400).json({ massage: await IsAdminByEmail(req.body.email) })
        }
    } catch (error) {
        res.status(400).json({ massage: "Error isAdmin post" })
    }
})

router.post("/addNewMoto", async (req, res) => {
    try {
        if (await IsAdminByEmail(req.body.email)) {
            const newMoto = new Moto({
                brand: req.body.moto.brand,
                model: req.body.moto.model,
                price: req.body.moto.price,
                imgURL: req.body.moto.imgURL,
                collectionType: req.body.moto.collectionType,
                displacement: req.body.moto.displacement,
                borexStroke: req.body.moto.borexStroke,
                compressionRatio: req.body.moto.compressionRatio,
                horsepower: req.body.moto.horsepower,
                torque: req.body.moto.torque,
                fuelSystem: req.body.moto.fuelSystem,
                gearbox: req.body.moto.gearbox,
            })
            await newMoto.save()
            res.status(200).json({ massage: { ua: "Добалено!", en: "Added!" } })
        }
        else {
            res.status(400).json("You are not an admin")
        }
    } catch (error) {
        res.status(400).json({ massage: "Error addNewMoto post" })
    }
})

router.post("/deleteMoto", async (req, res) => {
    try {
        if (await IsAdminByEmail(req.body.email)) {
            await Moto.findByIdAndDelete(req.body.id)
            res.status(200).json({ massage: { ua: "Видалено!", en: "Delete!" } })
        }
        else {
            res.status(400).json("You are not an admin")
        }
    } catch (error) {
        res.status(400).json({ massage: "Error deleteMoto delete" })
    }

})

router.patch("/changeMoto", async (req, res) => {
    try {
        if (await IsAdminByEmail(req.body.email)) {
            let moto = await Moto.findById(req.body.moto.id)
            moto.brand = req.body.moto.brand,
                moto.model = req.body.moto.model,
                moto.price = req.body.moto.price,
                moto.imgURL = req.body.moto.imgURL,
                moto.collectionType = req.body.moto.collectionType,
                moto.displacement = req.body.moto.displacement,
                moto.borexStroke = req.body.moto.borexStroke,
                moto.compressionRatio = req.body.moto.compressionRatio,
                moto.horsepower = req.body.moto.horsepower,
                moto.torque = req.body.moto.torque,
                moto.fuelSystem = req.body.moto.fuelSystem,
                moto.gearbox = req.body.moto.gearbox,
                await moto.save()
            res.status(200).json({ massage: { ua: "Властивості мотоцикла було змінено!", en: "Motorcycle properties have been changed!!" } })
        }
        else {
            res.status(400).json("You are not an admin")
        }
    } catch (error) {
        res.status(400).json({ massage: "Error changeMoto patch" })
    }
})




router.post("/addNewNews", async (req, res) => {
    try {
        if (await IsAdminByEmail(req.body.email)) {
            const newNews = new News({
                header:req.body.news.header,
                img:req.body.news.img,
                text:req.body.news.text,
                status:req.body.news.status,
                data:req.body.news.data,
                indexData:req.body.news.indexData
            })
            await newNews.save()
            res.status(200).json({ massage: { ua: "Добалено!", en: "Added!" } })
        }
        else {
            res.status(400).json("You are not an admin")
        }
    } catch (error) {
        res.status(400).json({ massage: "Error addNewNews Post" })
    }
})

router.post("/deleteNews", async (req, res) => {
    try {
        if (await IsAdminByEmail(req.body.email)) {
            await News.findByIdAndDelete(req.body.id)
            res.status(200).json({ massage: { ua: "Видалено!", en: "Delete!" } })
        }
        else {
            res.status(400).json("You are not an admin")
        }
    } catch (error) {
        res.status(400).json({ massage: "Error deleteNews delete" })
    }
})

router.patch("/changeNews", async (req, res) => {
    try {
        if (await IsAdminByEmail(req.body.email)) {
            let news = await News.findById(req.body.news.id)
                news.header = req.body.news.header,
                news.img = req.body.news.img, 
                news.text = req.body.news.text,
                news.status = req.body.news.status,
                news.data = req.body.news.data,
                news.indexData = req.body.news.indexData
                await news.save()
            res.status(200).json({ massage: { ua: "Властивості новини було змінено!", en: "News properties have been changed!!" } })
        }
        else {
            res.status(400).json("You are not an admin")
        }
    } catch (error) {
        res.status(400).json({ massage: "Error changeNews Patch" })
    }
})

// admin



module.exports = router
