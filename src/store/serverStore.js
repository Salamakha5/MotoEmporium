import { makeAutoObservable, toJS } from "mobx"
import axios from 'axios';
// import { decodeToken, useJwt } from "react-jwt";
// import alertify from 'alertifyjs'

class ServerStore {
    URL = 'https://moto-server.onrender.com/api'
    userIsAuth = false
    MotoData = []
    MotoDataCopy = []
    ErrorMotoSort = ""
    lengthPagNumber = 0
    ArrTypeName = []
    UserName = "Дефолт"
    spinerShop = "d-block"

    constructor() {
        makeAutoObservable(this)
    }
    setlengthPagNumber(number){
        this.lengthPagNumber = number
    }

    getAllMoto() {
        this.ErrorMotoSort = ""
        console.log("getAllMoto");

        // localHost
        // this.spinerShop = "d-block"
        // axios.get("http://localhost:4000/api" + "/getAllMoto")
        //     .then((response) => {
        //         // console.log("this.getAllMoto");
        //         this.MotoData = response.data
        //         this.MotoDataCopy = this.MotoData
        //         this.spinerShop = "d-none"
        //     })
        //     .catch((error) => {
        //         console.log(error);
        //     });
        // localHost

        // SERVER
        this.spinerShop = "d-block"
        axios.get(this.URL + "/getAllMoto")
            .then((response) => {
                this.MotoData = response.data
                this.MotoDataCopy = this.MotoData
                this.spinerShop = "d-none"
            })
            .catch((error) => {
                console.log(error);
            });
        // SERVER
    }
    getMotoNameToType(type) {
        let arr = toJS(this.MotoData).filter(moto => moto.collectionType == type)
        let res = []
        for (let i = 0; i < arr.length; i++) {
            res.push(arr[i].model)
        }
        this.ArrTypeName = res
        console.log(this.ArrTypeName);
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
                    // console.log(error);
                });
        }
    }

    // Shop
    SortCash(value) {
        switch (value) {
            case "upper":
                this.MotoDataCopy.sort((a, b) => a.price - b.price)
                break;
            case "lower":
                this.MotoDataCopy.sort((a, b) => b.price - a.price)
                break;
        }
    }

    sortMotoData(obj) {
        const { SortToBrand, SortToModel, SortSelectCatigories, SortSelectModel } = obj
        console.log(SortToBrand, SortToModel, SortSelectCatigories, SortSelectModel);
        console.log("sortMotoData");
        this.ErrorMotoSort = ""
        this.MotoDataCopy = this.MotoData
        if (SortToBrand) {
            this.MotoDataCopy = this.MotoDataCopy.filter(moto => moto.brand.includes(SortToBrand))
            if (this.MotoDataCopy == false) {
                this.ErrorMotoSort = "Такого бренду немає"
            }
        }
        if (SortToModel) {
            this.MotoDataCopy = this.MotoDataCopy.filter(moto => moto.model.includes(SortToModel))
            if (this.MotoDataCopy == false) {
                this.ErrorMotoSort = "Такої моделі не існує"
            }
        }
        if (SortSelectCatigories) {
            console.log("SortSelectCatigories");
            if (SortSelectCatigories == "0") {
                this.MotoDataCopy = this.MotoDataCopy.filter(p => true)
            } else {
                this.MotoDataCopy = this.MotoDataCopy.filter(moto => moto.collectionType == SortSelectCatigories)
                if (this.MotoDataCopy == false) {
                    this.ErrorMotoSort = "Мотоциклу такого типу немає"
                }
            }
        }
        if (SortSelectModel) {
            if (SortSelectCatigories !== "0") {
                console.log("SortSelectModel");
                if (SortSelectModel == "0") {
                    this.MotoDataCopy = this.MotoDataCopy.filter(moto => moto.collectionType == SortSelectCatigories)
                } else {
                    this.MotoDataCopy = this.MotoDataCopy.filter(moto => moto.model == SortSelectModel)
                    if (this.MotoDataCopy == false) {
                        this.ErrorMotoSort = "Мотоциклу з такою назвою у цій категорії немає"
                    }
                }
            }

        }
    }
    // Shop


}

export default new ServerStore()