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
            
            <div className="header__wrap d-flex align-items-center">

                <ul className='header__nav d-flex align-items-center'>
                    <span>
                        <NavLink className='nav-item main-link for-dev' to='/login' element={<Login />}>Логін</NavLink>
                        <NavLink className='nav-item main-link for-dev' to='/register' element={<Login />}>Реєстрація</NavLink>
                    </span>
                    <NavLink className='nav-item main-link' to='/home' element={<Home />}>Головна</NavLink>
                    <NavLink className='nav-item main-link' to='/home' element={<Home />}>Каталог</NavLink>
                    <NavLink className='nav-item main-link disabled' disable to='/home' element={<Home />}>Блог</NavLink>
                    
                    <a onClick={()=>serverStore.exit()} className='nav-item main-link disabled'>Вийти <i class="fs-4 bi bi-door-open-fill"></i> </a>
                </ul>
                
                <div className='header__user'>
                    <div className="decoration"></div>
                    <div className='pb-1'>{serverStore.UserName}</div>
                </div>
            </div>

        </header>
    )
})

export default Header