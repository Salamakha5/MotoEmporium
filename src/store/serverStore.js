import { makeAutoObservable } from "mobx"
import axios from 'axios';

class ServerStore {
    URL = 'https://moto-server.onrender.com/api'
    userIsAuth = false

    constructor() {
        makeAutoObservable(this)
    }

    loginUser(emailL, passwordL) {

        axios.post(`${this.URL}/login`, {
            // email: 'ggg@gmail.com',
            // password: '12345'
            email: `${emailL}`,
            password: `${passwordL}`
        })
            .then((response) => {
                console.log(response.data);
                this.userIsAuth = response.data.isAuth
            }, (error) => {
                console.log(error);
            });


    }

    registerUser(nameR, emailR, passwordR) {
        axios.post(`${this.URL}/register`, {
            name: `${nameR}`,
            email: `${emailR}`,
            password: `${passwordR}`
        })
            .then((response) => {
                console.log(response);
            }, (error) => {
                console.log(error);
            });
        console.log(nameR);
        console.log(emailR);
        console.log(passwordR);
    }


}

export default new ServerStore()