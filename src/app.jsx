import "./app.css"
import { observer } from 'mobx-react-lite';
import { BrowserRouter as Router, Routes, Route, Outlet, NavLink } from 'react-router-dom'
import Login from './pages/Login/Login.jsx';
import Register from './pages/Register/Register.jsx';
import Home from './pages/Home/Home.jsx';
import NotFound from './pages/NotFound/NotFound.jsx';
import serverStore from './store/serverStore';
import { useEffect } from "react";

const App = observer(() => {
    useEffect(()=>{
        serverStore.decodedToken(localStorage.getItem("IsAuthMOTO"))
    },[])
    return (
              <Router>
            {
                serverStore.userIsAuth == true ?
                    <Routes>
                        <Route path='*' element={<NotFound />} />
                        <Route path='/' element={<Home />} />
                        <Route path='/home' element={<Home />} />
                    </Routes>
                    :
                    <Routes>
                        <Route path='*' element={<Login />} />
                        <Route path='/login' element={<Login />} />
                        <Route path='/register' element={<Register />} />
                    </Routes>
            }
        </Router>
    );
})

export default App;