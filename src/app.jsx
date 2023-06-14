import "./app.scss"

import Login from './pages/Login/Login.jsx'
import Register from './pages/Register/Register.jsx'
import NotFound from './pages/NotFound/NotFound.jsx'
import Home from './pages/Home/Home.jsx'
import Layot from "./components/Layot/Layot"
import Shop from "./pages/Shop/Shop"
import Blog from "./pages/Blog/Blog"
import Contact from "./pages/Contact/Contact"
import serverStore from './store/serverStore'
import OneMoto from "./pages/OneMoto/OneMoto"
import BasketPage from "./pages/Basket/BasketPage"
import Payment from "./pages/Payment/Payment"
import Admin from "./pages/Admin/Admin"
import PersonalOffice from "./pages/PersonalOffice/PersonalOffice"

import alertify from 'alertifyjs'
import { observer } from 'mobx-react-lite'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useEffect } from "react"
import { useTranslation } from 'react-i18next';
import { toJS } from 'mobx'

const App = observer(() => {

    const { t } = useTranslation();
    useEffect(() => {

        if (localStorage.getItem("IsAuthMOTO") != null) {
            serverStore.tokenDecoded = false

            serverStore.decodedToken(localStorage.getItem("IsAuthMOTO"), (decodedResult) => {
                if (decodedResult === 'succes') {
                    serverStore.tokenDecoded = true

                    // чек на адміна
                    serverStore.checkAdminRoots(toJS(serverStore.UserData.user.email))
                } else {
                    alertify.alert(t('app.alert-warning'), t('app.alert-oldToken'));
                    serverStore.tokenDecoded = true
                }
            })
        } else {
            serverStore.tokenDecoded = true
        }

        // serverStore.checkAdminRoots(toJS(serverStore.UserData.user.email))

        if (serverStore.tokenDecoded = true) {
            // чек на адміна
            // console.log(serverStore.UserData.user.email);
            // console.log(serverStore.UserData.user.email);
        }

    }, [])

    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Layot />}>
                        <Route index element={<Home />} />
                        <Route path='blog' element={<Blog />} />
                        <Route path='contact' element={<Contact />} />
                    </Route>
                    <Route path='*' element={<NotFound />} />
                    {
                        serverStore.userIsAuth === true ?
                            <>
                                <Route path="/" element={<Layot />}>
                                    <Route path='shop' element={<Shop />} />
                                    <Route path='moto' element={<OneMoto />} />
                                    <Route path='basket' element={<BasketPage />} />
                                    <Route path='payment' element={<Payment />} />
                                    <Route path='office' element={<PersonalOffice />} />
                                    <Route path='admin' element={<Admin />} />
                                </Route>
                            </>
                            :
                            <Route>
                                <Route path="/" element={<Layot />}>
                                    <Route path='shop' element={<Shop />} />
                                </Route>
                                <Route path='login' element={<Login />} />
                                <Route path='register' element={<Register />} />
                            </Route>
                    }
                </Routes>
            </BrowserRouter>
        </div>
    );
})

export default App;