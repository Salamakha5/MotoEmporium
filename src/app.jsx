import "./app.scss"

import Login from './pages/Login/Login.jsx';
import Register from './pages/Register/Register.jsx';
import Home from './pages/Home/Home.jsx';
import NotFound from './pages/NotFound/NotFound.jsx';
import Layot from "./components/Layot/Layot";
import Shop from "./pages/Shop/Shop";

import { observer } from 'mobx-react-lite';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import serverStore from './store/serverStore';
import { useEffect } from "react";

const App = observer(() => {
    useEffect(() => {
        serverStore.decodedToken(localStorage.getItem("IsAuthMOTO"))
    }, [])
    return (

        <div>
            <Router>
                {
                    serverStore.userIsAuth == true ?
                        <Routes>
                            <Route path='*' element={<NotFound />} />
                            <Route path="/" element={<Layot />}>
                                <Route path='/' element={<Home />} />
                                <Route path='home' element={<Home />} />
                                <Route path='shop' element={<Shop />} />
                            </Route>
                        </Routes>
                        :
                        <Routes>
                            <Route path="/" element={<Layot />}>
                                <Route path='/' element={<Home />} />
                                <Route path='/home' element={<Home />} />
                            </Route>
                            <Route path='*' element={<Login />} />
                            <Route path='/login' element={<Login />} />
                            <Route path='/register' element={<Register />} />
                        </Routes>
                }
            </Router>

        </div>

    );
})

export default App;