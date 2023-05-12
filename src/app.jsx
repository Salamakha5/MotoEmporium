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

import { observer } from 'mobx-react-lite'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useEffect } from "react"

const App = observer(() => {

    useEffect(() => {
        if (localStorage.getItem("IsAuthMOTO") != null) serverStore.decodedToken(localStorage.getItem("IsAuthMOTO"));
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
                            <Route path="/" element={<Layot />}>
                                <Route path='shop' element={<Shop />} />
                                <Route path='moto' element={<OneMoto />} />
                            </Route>
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