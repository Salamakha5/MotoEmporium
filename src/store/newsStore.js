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

            })
            .catch((error) => {
                console.log(error);
            })
    }
    setlengthPagNumber(number) {
        this.lengthPageNumber = number
    }
    sortNews(type) {
        if (type === "new") {
            this.newsData = this.newsData.reverse()
        }
        if (type === "old") {
            this.newsData = this.newsData.reverse()
        }
    }

    activeLink = 1
    setActiveLink(number) {
        this.activeLink = number
    }

}

export default new NewsStore()