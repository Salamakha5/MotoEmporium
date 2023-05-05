import { makeAutoObservable, toJS } from "mobx"
import axios from 'axios';
// import { decodeToken, useJwt } from "react-jwt";

class ServerStore {
    URL = 'https://moto-server.onrender.com/api'
    userIsAuth = false
    MotoData = []
    OneMoto = []
    MotoDataCopy = []
    threeMotoCard = []

    ErrorMotoSort = ""
    lengthPageNumber = 0
    ArrTypeName = []
    UserName = "Дефолт"
    spinerShop = "d-block"
    spinerInfo = "d-block"
    constructor() {
        makeAutoObservable(this)
    }

    // * global  methods
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
    // * end global methods

    // Shop
    getAllMoto() {
        this.ErrorMotoSort = ""
        // console.log("getAllMoto");
        this.spinerShop = "d-block"
        // axios.get("http://localhost:4000/api" + "/getAllMoto")
        axios.get(this.URL + "/getAllMoto")
            .then((response) => {
                this.MotoData = response.data
                this.MotoDataCopy = this.MotoData
                this.spinerShop = "d-none"

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
            })
            .catch((error) => {
                console.log(error);
            });
    }

    getMotoNameToType(type) {
        let arr = toJS(this.MotoData).filter(moto => moto.collectionType == type)
        let res = []
        for (let i = 0; i < arr.length; i++) {
            res.push(arr[i].model)
        }
        this.ArrTypeName = res
    }

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
    // end Shop


}

export default new ServerStore()