import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';

import Login from './pages/Login/Login.jsx';
import Register from './pages/Register/Register.jsx';
import Home from './pages/Home/Home.jsx';
import NotFound from './pages/NotFound/NotFound.jsx';
import { BrowserRouter as Router, Routes, Route, Outlet, NavLink } from 'react-router-dom'

import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.min.js';
import '../node_modules/bootstrap-icons/font/bootstrap-icons.css';

import './index.scss';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>


        <Router>
            {/* <NavLink to='/login' >login</NavLink> */}
            {/* <NavLink to='/register' >register</NavLink> */}
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/login' element={<Login />} />
                <Route path='/register' element={<Register />} />
                <Route path='*' element={<NotFound />} />
            </Routes>
        </Router>

    </React.StrictMode>
);
reportWebVitals();