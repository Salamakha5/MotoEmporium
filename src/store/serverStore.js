import { makeAutoObservable } from "mobx"
import axios from 'axios';
// import { decodeToken, useJwt } from "react-jwt";
import alertify from 'alertifyjs'
import { BrowserRouter } from 'react-router-dom'


class ServerStore {
    URL = 'https://moto-server.onrender.com/api'
    userIsAuth = false
    MotoData = []
    registerAnswer = ''
    loginError = ""
    UserName = "Дефолт"
    spinerShop = "d-block"
    showPageLoader = false

    constructor() {
        makeAutoObservable(this)
    }

    getAllMoto() {
        this.spinerShop = "d-block"
        axios.get(this.URL + "/getAllMoto")
            .then((response) => {
                // console.log("this.getAllMoto");
                this.MotoData = response.data
                this.spinerShop = "d-none"
            })
            .catch((error) => {
                console.log(error);
            });
    }

    unLogin() {
        localStorage.removeItem("IsAuthMOTO")
        this.userIsAuth = false
        this.UserName = "після унлогін"
    }

    loginUser(emailL, passwordL) {

        axios.post(`${this.URL}/login`, {
            email: `${emailL}`,
            password: `${passwordL}`
        })
            .then((response) => {
                this.userIsAuth = response.data.isAuth
                this.loginError = ""
                this.showPageLoader = false
                localStorage.setItem("IsAuthMOTO", response.data.token)

                window.location.href = "/"
            }, (error) => {
                this.showPageLoader = false
                this.loginError = error.response.data.massage
            });
    }

    decodedToken(decToken) {
        if (decToken) {
            axios.post(this.URL + "/decoded", {
                token: decToken
            })
                .then((response) => {
                    this.userIsAuth = response.data.isAuth
                    this.UserName = response.data.user.name
                })
                .catch((error) => {
                    this.userIsAuth = false
                    console.log(error);
                });
        }
    }

    registerUser(nameR, emailR, passwordR) {
        // console.log(nameR, emailR, passwordR);
        axios.post(this.URL + '/registration', {
            name: nameR,
            email: emailR,
            password: passwordR
        })
            .then((response) => {
                this.registerAnswer = response.data.massage

                if (this.registerAnswer == 'Успішна реєстрація!') {
                    this.showPageLoader = false
                    alertify.alert('Успіх', `Користувач ${nameR} зареєстрований успішно!`, function () {
                        window.location.href = "/login"
                    });
                }
            })
            .catch((error) => {
                this.registerAnswer = error.response.data.massage

                if (this.registerAnswer == 'Користувач з такою поштою вже є') {
                    this.showPageLoader = false
                    alertify.alert('Помилка', 'Користувач з такою поштою вже існує!');
                }
                if (this.registerAnswer == 'Помилка:') {
                    this.showPageLoader = false
                    alertify.alert(`Помилка`, `${error.response.data.error}`);
                }
            });
    }


}

export default new ServerStore()