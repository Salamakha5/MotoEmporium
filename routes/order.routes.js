const Router = require("express")
const Order = require("../models/Order.js")

const router = Router()


router.post("/getOrdersToEmail",async(req,res)=>{
    try {   
        const orders = await Order.find({UserEmail:req.body.email})
        res.status(200).json(orders)
    } catch (error) {
        res.status(400).json({massage:"Error getOrdersToEmail post"})
    }
})

router.post("/deleteOrderById",async(req,res)=>{
    try {
        console.log(req.body.id);
        await Order.findByIdAndDelete(req.body.id)
        res.status(200).json({massage:"OK"})
    } catch (error) {
        res.status(400).json({massage:"Error deleteOrderById post"})
    }
})


router.post("/OrderMoto", async (req, res) => {
    try {
        const { fullName, PhoneNumber, City, PostOffice,
            SerialNumber, DateOfBuy, UserEmail, BuyedMoto, AllPrice, CreditCard } = req.body


        let order = new Order(
            {
                fullName: fullName,
                PhoneNumber: PhoneNumber,
                City: City,
                PostOffice: PostOffice,
                SerialNumber: SerialNumber,
                DateOfBuy: DateOfBuy,
                UserEmail: UserEmail,
                BuyedMoto: BuyedMoto,
                AllPrice: AllPrice,
                CreditCard: CreditCard
            }
        )
        await order.save()
        res.status(200).json(req.body)

    } catch (error) {
        res.status(400).json({ massage: "Error OrderMoto Post" })
    }

})

module.exports = router
