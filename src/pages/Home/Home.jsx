import './Home.scss'

import Register from '../Register/Register.jsx';
import Login from '../Login/Login.jsx';
import NotFound from '../NotFound/NotFound.jsx';

import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom'

const Home = () => {
    return (
        <div className="home">
            <h1>Home</h1>
            <br></br>
            <header>

                <NavLink to='/login' element={<Login />}>(<a className="main-link">логін</a>)</NavLink>
                -----
                <NavLink to='/register' element={<Register />}>(<a className="main-link">регістер</a>)</NavLink>
                -----
                <NavLink to='*' element={<NotFound />}>(<a className="main-link">нот фаунд</a>)</NavLink>

            </header>
        </div>
    )
}

export default Home