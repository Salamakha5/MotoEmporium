import { makeAutoObservable } from "mobx"
import axios from 'axios';
// import { decodeToken, useJwt } from "react-jwt";
import alertify from 'alertifyjs'


class ServerStore {
    URL = 'https://moto-server.onrender.com/api'
    userIsAuth = false
    MotoData = []
    UserName = "Дефолт"
    spinerShop = "d-block"

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
        this.UserName = ""
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

}

export default new ServerStore()