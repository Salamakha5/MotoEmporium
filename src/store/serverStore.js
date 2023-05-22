import { makeAutoObservable, toJS } from "mobx"
import axios from 'axios';
// import { decodeToken, useJwt } from "react-jwt";

class ServerStore {
    URL = 'https://moto-server.onrender.com/api'
    userIsAuth = false
    MotoData = []
    MotoDataCopy = []
    OneMoto = []
    threeMotoCard = []
    IsMotoBuy = false
    IsStorageId = false
    IsFavoriteMoto = false
    tokenDecoded = false
    lengthPageNumber = 0
    ArrTypeName = []
    UserName = "dafault"
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
                this.IsMotoBuy = false
                this.IsStorageId = JSON.parse(localStorage.getItem("BasketMoto")).some(moto => moto.id === response.data._id)
                this.IsFavoriteMoto = JSON.parse(localStorage.getItem("FavoriteMoto")).includes(response.data._id)
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

    decodedToken(decToken, appCallback) {
        let decodedResult
        if (decToken) {
            axios.post(this.URL + "/decoded", {
                token: decToken
            })
                .then((response) => {
                    this.userIsAuth = response.data.isAuth
                    this.UserName = response.data.user.name
                    decodedResult = 'succes'

                    appCallback(decodedResult)
                })
                .catch((error) => {
                    this.userIsAuth = false
                    localStorage.removeItem('IsAuthMOTO')
                    decodedResult = 'error'
                    console.log('log er');

                    // callback in app.jsx
                    appCallback(decodedResult)
                });
        }
    }

    // Shop
    getAllMoto(callbackAfterDownloading) {

        // axios.get("http://localhost:4000/api" + "/getAllMoto")
        axios.get(this.URL + "/getAllMoto")
            .then((response) => {
                this.MotoData = response.data
                // MotoDataCopy using in shop.jsx
                this.MotoDataCopy = this.MotoData
                this.updateThreeMotos(this.MotoData)
                callbackAfterDownloading()
            })
            .catch((error) => {
                callbackAfterDownloading()
            });
    }

    updateThreeMotos(MotoData) {

        this.threeMotoCard = []
        for (let i = 0; i < 3; i++) {
            if (this.threeMotoCard.length <= 2) {
                let randomMoto = MotoData[this.getRandomNumber(0, MotoData.length - 1)]
                let checkId = this.threeMotoCard.some(obj => obj['_id'] === randomMoto._id)
                if (!checkId) {
                    this.threeMotoCard.push(randomMoto)
                } else {
                    i--
                }
            }
        }
    }

    // shop pagination
    activeLink = 1
    setActiveLink(number) {
        this.activeLink = number
    }
    // end Shop
}

export default new ServerStore()