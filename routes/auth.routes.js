const Router = require("express")
const { check, validationResult } = require("express-validator")
const User = require("../models/User.js")
const jwt = require("jsonwebtoken")

const router = Router()

router.post("/registration", [
    check("email", "Не коректна пошта").isEmail(),
    check("password", "Мінімальній пароль від 3 до 20 символів").isLength({ min: 3, max: 20 })
], async (req, res) => {
    try {
        const { name, email, password } = req.body
        // перевірка на помилки 
        const error = validationResult(req)
        if (!error.isEmpty()) {
            let err = []
            for (let i = 0; i < error.errors.length; i++) {
                err.push(error.errors[i].msg)
            }
            return res.status(400).json({ massage: "Помилка:", error: err })
        }
        const candidate = await User.findOne({ email: email })
        if (candidate) {
            return res.status(400).json({ massage: "Користувач з такою поштою вже є" })
        }
        else {
            const user = new User({ name: name, email: email, password: password })
            await user.save()
            return res.status(200).json({ massage: "Успішна реєстрація!" })
        }
    } catch (e) {
        console.log(e);
        res.status(400).json({ massage: "Error Registration Post" })
    }
})

router.post("/decoded", (req, res) => {
    try {
        const decoded = jwt.verify(req.body.token, process.env.TOKENKEY)
        if (decoded.isAuth == true) {
            return res.json(decoded)
        }
    } catch (error) {
        return res.status(400).json({ massage: "Error Token" })
    }

})


router.post("/deleteUser",async (req,res) =>{
    console.log(req.body.id);
    try {
        await User.findByIdAndDelete(req.body.id)
        res.status(200).json({massage:"OK"})
    } catch (error) {
        res.status(400).json({massage:"Error deleteUser post"})
    }
})


router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body
        const candidate = await User.findOne({ email: email })
        if (!candidate) {
            return res.status(400).json({ massage: "Такого користувача не знайдено", isAuth: false })
        } else {
            if (password !== candidate.password) {
                return res.status(400).json({ massage: "Не правильний пароль", isAuth: false })
            }
            else {
                const token = jwt.sign({
                    massage: "Успішний вхід",
                    isAuth: true,
                    user: {
                        name: candidate.name,
                        id: candidate._id,
                        email: candidate.email
                    }
                }, process.env.TOKENKEY, { expiresIn: "48h" })


                return res.status(200).json({
                    massage: "Успішний вхід",
                    isAuth: true,
                    user: {
                        name: candidate.name,
                        id: candidate._id,
                        email: candidate.email
                    },
                    token: token
                })
            }
        }
    }
    catch (e) {
        console.log(e);
        res.status(400).json({ massage: "Error login Post" })
    }
})

router.post("/changeUserSetting", async (req, res) => {
    try {
        const { email, name, oldPass, newPass } = req.body.formValue
        const user = await User.findOne({ email: email })
        if (user) {
            if (name.length == 0 && oldPass.length == 0 && newPass.length == 0) {
                return res.status(400).json({ UA: "Жодне поле не заповнене", EN: "No field is filled" })
            }
            else {
                if (name.length >= 4) {
                    if (user.name == name) {
                        return res.status(400).json({
                            UA: "Ім'я співпадає з попереднім",
                            EN: "The name is the same as the previous one",
                        })
                    }
                    user.name = name
                    await user.save();
                }
                if (newPass.length >= 4 && oldPass.length >= 4) {
                    if (oldPass == user.password) {
                        if (oldPass == newPass) {
                            return res.status(400).json(
                                {
                                    UA: "Паролі співпадають",
                                    EN: "The passwords match",
                                })
                        }
                        user.password = newPass
                        await user.save()
                    }
                    else {
                        return res.status(400).json(
                            {
                                UA: "Старий пароль не вірний",
                                EN: "The old password is not valid",
                            })
                    }
                }
                else {
                    if (!(oldPass.length == 0 && newPass.length == 0)) {
                        return res.status(400).json(
                            { UA: "Заповніть усі поля для зміни паролю", EN: "No field is filled" }
                        )
                    }
                }
                return res.status(200).json("All Good")
            }

        } else {
            return res.status(400).json({ UA: "Користувача з такою поштою не існує", EN: "User with this email does not exist" })
        }
    } catch (error) {
        console.log(error);
        res.status(400).json({ massage: "Error ChangeUserSetting Post" })
    }


})



module.exports = router