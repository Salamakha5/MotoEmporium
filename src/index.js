import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.min.js';
import '../node_modules/bootstrap-icons/font/bootstrap-icons.css';


import './index.scss';

import Login from './pages/Login/Login.jsx';
import Register from './pages/Register/Register.jsx';
import Home from './pages/Home/Home.jsx';
import NotFound from './pages/NotFound/NotFound.jsx';
import serverStore from './store/serverStore';

import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Routes, Route, Outlet, NavLink } from 'react-router-dom'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>

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
                        <Route path='*' element={<NotFound />} />
                        <Route path='/' element={<Login />} />
                        <Route path='/login' element={<Login />} />
                        <Route path='/register' element={<Register />} />
                    </Routes>
            }
        </Router>

    </React.StrictMode>
);
reportWebVitals();