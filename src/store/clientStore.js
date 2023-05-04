import { makeAutoObservable, toJS } from "mobx"
class ClientStore {
    // language = 'ua'

    constructor() {
        makeAutoObservable(this)
    }    
}

export default new ClientStore()