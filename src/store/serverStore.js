import { makeAutoObservable } from "mobx"
import axios from 'axios';
import { decodeToken, useJwt } from "react-jwt";
class ServerStore {
    URL = 'https://moto-server.onrender.com/api'
    userIsAuth = false
    registerError=""
    loginError=""
    constructor() {
        makeAutoObservable(this)
    }

    loginUser(emailL, passwordL) {
        axios.post(`${this.URL}/login`, {
            email: `${emailL}`,
            password: `${passwordL}`
        })
            .then((response) => {
                console.log(response.data.isAuth);
                this.userIsAuth = response.data.isAuth
                this.loginError = ""
                window.location.href = "/home"
                localStorage.setItem("IsAuthMOTO",response.data.token)
            }, (error) => {
                console.log(error);
                this.loginError = error.response.data.massage
            });


    }

    decodedToken(token1){
        if(token1){
            axios.post(this.URL+"/decoded", {
                token:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtYXNzYWdlIjoi0KPRgdC_0ZbRiNC90LjQuSDQstGF0ZbQtCIsImlzQXV0aCI6dHJ1ZSwidXNlciI6eyJuYW1lIjoiVmxhZCIsImlkIjoiNjQzMDM1ZmViNzczMTc2NGZhMWY3OTg0IiwiZW1haWwiOiJBZG1pbkBnbWFpbC5jb20ifSwiaWF0IjoxNjgwODg2NjA4LCJleHAiOjE2ODA5NzMwMDh9.EIpuCBaLoXWoJoanHnUaXM-SSrSkHTUyudeACxhSCNM"
             })
              .then((response)=> {
                console.log(response.data.IsAuth);
                this.userIsAuth = response.data.IsAuth
            })
            .catch((error)=> {
                this.userIsAuth = false
                console.log(error);
            });
        }
    }


    registerUser(nameR, emailR, passwordR) {
        axios.post(this.URL+'/registration', {
            name:nameR,
            email:emailR,
            password:passwordR
          })
          .then((response)=> {
              this.registerError = ""
            window.location.href="/login"
        })
          .catch((error)=> {
               this.registerError = error.response.data.massage
        });
    }


}

export default new ServerStore()