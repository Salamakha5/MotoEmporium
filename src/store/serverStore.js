import { makeAutoObservable } from "mobx"
import axios from 'axios';

class ServerStore {
    URL = 'https://moto-server.onrender.com/api'
    userIsAuth = false
    MotoData = []
    UserData = []
    MotoDataCopy = []
    OneMoto = []
    threeMotoCard = []
    IsMotoBuy = false
    IsStorageId = false
    IsFavoriteMoto = false
    tokenDecoded = false
    haveAdminRoots = false
    ArrTypeName = []
    UserName = "dafault"
    spinerInfo = "d-block"
    constructor() {
        makeAutoObservable(this)
    }


    getRandomNumber(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    getMotoById(id) {
        this.spinerInfo = "d-block"

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
                    this.UserData = response.data
                    this.userIsAuth = response.data.isAuth
                    this.UserName = response.data.user.name
                    decodedResult = 'succes'

                    appCallback(decodedResult)
                })
                .catch((error) => {
                    this.userIsAuth = false
                    localStorage.removeItem('IsAuthMOTO')
                    decodedResult = 'error'

                    appCallback(decodedResult)
                });
        }
    }

    getAllMoto(callbackAfterDownloading) {

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

    // чек на адміна
    checkAdminRoots(userEmail) {

        axios.post(`${this.URL}/isAdmin`, {
            email: userEmail
        })
            .then((response) => {
                // console.log('успіх', response.data.massage);
                this.haveAdminRoots = response.data.massage
            })
            .catch((error) => {
                // console.log('не успіх', error.data.massage);
                this.haveAdminRoots = error.data.massage
            });
    }

    // shop pagination
    motoCountPages = 0
    setMotoCountPages(n) {
        this.motoCountPages = n
    }
    motoActivePage = 1
    setMotoActivePage(n) {
        this.motoActivePage = n
    }
    motoObjectsPerPage = 8

}

export default new ServerStore()