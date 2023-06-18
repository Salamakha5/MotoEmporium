import axios from "axios"
import { makeAutoObservable, toJS } from "mobx"

class NewsStore {
    constructor() {
        makeAutoObservable(this)
    }
    URL = 'https://moto-server.onrender.com/api'
    newsData = []
    newsCountPages = 0
    newsCountPages1 = 0
    getAllNews(callback) {
        axios.get(this.URL + "/getAllNews")
            .then((response) => {
                this.newsData = toJS(response.data)
                callback()
            })
            .catch((error) => {
                console.log(error);
                callback()
            })
    }

    // pagination
    setNewsCountPages(n) {
        this.newsCountPages = n
    }
    newsActivePage = 1
    setNewsActivePage(n) {
        this.newsActivePage = n
    }
    newsObjectsPerPage = 5
}

export default new NewsStore()