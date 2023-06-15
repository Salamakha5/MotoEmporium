import { makeAutoObservable, toJS } from "mobx"

class adminStore {
    constructor() {
        makeAutoObservable(this)
    }

    // products pagination
    productsCountPages = 0
    setProductsCountPages(n) {
        this.productsCountPages = n
    }
    productsActivePage = 1
    setProductsActivePage(n) {
        this.productsActivePage = n
    }
    productsObjectsPerPage = 5

}

export default new adminStore()