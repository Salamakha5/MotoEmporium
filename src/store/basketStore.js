import { makeAutoObservable, toJS } from "mobx"
import serverStore from "./serverStore"
class BasketStore {
    constructor() {
        makeAutoObservable(this)
    }
    BasketData = []
    FavData = []
    AllPriceMoto = 0
    IsFavoriteMoto = false


    GetOneMotoById(_id) {
        return JSON.parse(localStorage.getItem("BasketMoto")).find(moto => moto.id === _id);
    }
   
    getBasketMoto() {
        // getBasketMoto - перетворення айдішок з localStorage у масив з об'єктів
        let motoStorage = localStorage.getItem("BasketMoto")
        if (motoStorage) {
            let motoResult = []
            let AllPrice = 0
            for (const idIndex in JSON.parse(motoStorage)) {
                motoResult.push(toJS(serverStore.MotoData.filter(moto => moto._id == JSON.parse(motoStorage)[idIndex].id)[0]))
                motoResult[idIndex].current = JSON.parse(localStorage.getItem("BasketMoto")).find(moto=>moto.id === motoResult[idIndex]._id).current
            }
            for (const moto of motoResult) {
                AllPrice = AllPrice + (moto.price * moto.current)
            }
            this.AllPriceMoto = AllPrice
            this.BasketData = motoResult
        }
    }
    getFavoriteMoto() {
        // getMoto - перетворення айдішок з localStorage у масив з об'єктів
        let FavStorage = localStorage.getItem("FavoriteMoto")
        if (FavStorage) {
            let motoResult = []
            for (const idIndex in JSON.parse(FavStorage)) {
                motoResult.push(toJS(serverStore.MotoData).filter(moto=>moto._id == JSON.parse(localStorage.getItem("FavoriteMoto"))[idIndex])[0])
            }
            this.FavData = motoResult
        }
    }

}

export default new BasketStore()