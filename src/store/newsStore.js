import axios from "axios"
import { makeAutoObservable, toJS } from "mobx"

class NewsStore {
    constructor() {
        makeAutoObservable(this)
    }
    URL = 'https://moto-server.onrender.com/api'
    newsData = []
    lengthPageNumber=0
    getAllNews(){
        axios.get(this.URL+"/getAllNews")
        .then((response)=>{
            this.newsData = toJS(response.data)

        })
        .catch((error)=>{
            console.log(error);
        })
    }
    setlengthPagNumber(number) {
        this.lengthPageNumber = number
    }
    sortNews(type){
        if(type==="1"){
            this.newsData = this.newsData.reverse()
        }
        if(type==="2"){
            this.newsData = this.newsData.reverse()
        }
    }
    
}

export default new NewsStore()