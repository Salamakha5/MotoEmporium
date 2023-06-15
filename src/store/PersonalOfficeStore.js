import { makeAutoObservable } from "mobx"
class PersonalOfficeStore {
    constructor() {
        makeAutoObservable(this)
    }
    
}

export default new PersonalOfficeStore()