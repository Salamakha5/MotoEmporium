import { makeAutoObservable, toJS } from "mobx"
import axios from 'axios';
// import { decodeToken, useJwt } from "react-jwt";
import { useTranslation } from 'react-i18next';


class ServerStore {
    URL = 'https://moto-server.onrender.com/api'
    userIsAuth = true
    MotoData = []
    MotoDataCopy=[]
    OneMoto = []
    threeMotoCard = []


    lengthPageNumber = 0
    ArrTypeName = []
    UserName = "Дефолт"
    spinerInfo = "d-block"
    constructor() {
        makeAutoObservable(this)
    }


    setlengthPagNumber(number) {
        this.lengthPageNumber = number
    }

    getRandomNumber(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    getMotoById(id) {
        this.spinerInfo = "d-block"
        // axios.post("http://localhost:4000/api" + "/getMotoById", { id: id })
        axios.post(this.URL + "/getMotoById", { id: id })
            .then((response) => {
                this.OneMoto = response.data
                this.spinerInfo = "d-none"
            })
            .catch((error) => {
                console.log(error);
            });
    }

    getIdUrl() {
        let idIndex = window.location.href.search("id")
        let idValue = window.location.href.substring(idIndex + 3);
        this.getMotoById(idValue)
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
                });
        }
    }

    // Shop
    getAllMoto(callback) {
        axios.get("http://localhost:4000/api" + "/getAllMoto")
        // axios.get(this.URL + "/getAllMoto")
        .then((response) => {
            this.MotoData = response.data
            this.MotoDataCopy = this.MotoData
                for (let i = 0; i < 3; i++) {
                    if (this.threeMotoCard.length <= 2) {
                        let randomObj = this.MotoData[this.getRandomNumber(0, this.MotoData.length - 1)]
                        let checkId = this.threeMotoCard.some(obj => obj['_id'] === randomObj._id)
                        if (!checkId) {
                            this.threeMotoCard.push(randomObj)
                        } else {
                            i--
                        }
                    }
                }
                callback()
            })
            .catch((error) => {
                callback()
                console.log(error);
            });
    }
    // shop, pagination
    activeLink = 1
    setActiveLink(number) {
        this.activeLink = number
    }
    // end Shop
}

export default new ServerStore()