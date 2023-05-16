import { makeAutoObservable, toJS } from "mobx"
import serverStore from "./serverStore"
class BasketStore {
    constructor() {
        makeAutoObservable(this)
    }
    BasketData = []
    AllPriceMoto = 0
    
    getBasketMoto() {
        // getBasketMoto - перетворення айдішок з localStorage у масив з об'єктів
        let motoStorage = localStorage.getItem("BasketMoto")
        if(motoStorage){
            let motoResult = []
            let AllPrice = 0
            for (const idIndex in JSON.parse(motoStorage)) {
                motoResult.push(toJS(serverStore.MotoData.filter(moto=> moto._id == JSON.parse(motoStorage)[idIndex])[0]))
            }
            for (const moto of motoResult) {
                AllPrice = AllPrice + moto.price
            }
            this.AllPriceMoto = AllPrice
            this.BasketData = motoResult
        }
    }

}

export default new BasketStore()