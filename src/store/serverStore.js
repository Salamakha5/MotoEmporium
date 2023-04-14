import { makeAutoObservable } from "mobx"
import axios from 'axios';
import { decodeToken, useJwt } from "react-jwt";
class ServerStore {
    URL = 'https://moto-server.onrender.com/api'
    userIsAuth = true
    MotoData = []
    registerError = ""
    loginError = ""
    UserName = "Дефолт"
    spinerShop = "d-block"
    constructor() {
        makeAutoObservable(this)
    }
    
    getAllMoto(){
        this.spinerShop = "d-block"
        axios.get(this.URL + "/getAllMoto")
        .then((response) => {
            console.log("this.getAllMoto"); 
            this.MotoData = response.data
            this.spinerShop = "d-none"
            })
            .catch((error) => {
                console.log(error);
            });
    }

    unLogin(){
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
                console.log(response.data.isAuth);
                this.userIsAuth = response.data.isAuth
                this.loginError = ""
                window.location.href = "/home"
                localStorage.setItem("IsAuthMOTO", response.data.token)
            }, (error) => {
                console.log(error);
                this.loginError = error.response.data.massage
            });


    }

    decodedToken(token1) {
        if (token1) {
            axios.post(this.URL + "/decoded", {
                token:token1
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
        console.log(nameR,emailR,passwordR);
        axios.post(this.URL + '/registration', {
            name: nameR,
            email: emailR,
            password: passwordR
        })
            .then((response) => {
                this.registerError = ""
                window.location.href = "/login"
            })
            .catch((error) => {
                this.registerError = error.response.data.massage
            });
    }


}

export default new ServerStore()