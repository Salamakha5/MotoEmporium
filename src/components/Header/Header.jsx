import './Header.scss'

import { NavLink } from 'react-router-dom'
import Home from '../../pages/Home/Home.jsx'
import Login from '../../pages/Login/Login'
import Register from '../../pages/Register/Register'
import Shop from '../../pages/Shop/Shop'
import serverStore from '../../store/serverStore.js'
import { observer } from 'mobx-react-lite'

const Header = observer(() => {
    return (
        <header className="header">
            <div className="header__logo">two wheels</div>
            <div className="header__wrap">

                <ul className='header__nav'>
                    <span>
                        <NavLink className='nav-item main-link for-dev' to='/login' element={<Login />}>Login</NavLink>
                        <NavLink className='nav-item main-link for-dev' to='/register' element={<Login />}>Register</NavLink>
                    </span>
                    <NavLink className='nav-item main-link' to='/home' element={<Home />}>Home</NavLink>
                    <li className="nav-item dropdown">
                        <a className="nav-link dropdown-toggle main-link disabled" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            Motocycles
                        </a>
                        <ul className="dropdown-menu dropdown-menu-dark">
                            <li><a className="dropdown-item" href="#">Action</a></li>
                            <li><a className="dropdown-item" href="#">Another action</a></li>
                            <li><a className="dropdown-item" href="#">Something else here</a></li>
                        </ul>
                    </li>
                    <NavLink className='nav-item main-link disabled' disable to='/home' element={<Home />}>Our Blog</NavLink>
                    <NavLink className='nav-item main-link disabled' disable to='/home' element={<Home />}>Contact us</NavLink>
                </ul>
                <div className='header__user'>
                    <div className="decoration"></div>

                    {
                        serverStore.userIsAuth == true ?
                            <span>User is auth</span>
                            :
                            <span>User is NOT auth</span>
                    }
                </div>
            </div>

        </header>
    )
})

export default Header