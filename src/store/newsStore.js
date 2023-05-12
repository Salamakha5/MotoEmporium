import axios from "axios"
import { makeAutoObservable, toJS } from "mobx"

class NewsStore {
    constructor() {
        makeAutoObservable(this)
    }
    URL = 'https://moto-server.onrender.com/api'
    newsData = []
    lengthPageNumber = 0
    getAllNews() {
        axios.get(this.URL + "/getAllNews")
            .then((response) => {
                this.newsData = toJS(response.data)
                // console.log(toJS(response.data));
            })
            .catch((error) => {
                console.log(error);
            })
    }
    setlengthPagNumber(number) {
        this.lengthPageNumber = number
    }
    

    activeLink = 1
    setActiveLink(number) {
        this.activeLink = number
    }

}

export default new NewsStore()