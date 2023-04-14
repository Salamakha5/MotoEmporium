import './Header.scss'

import { NavLink } from 'react-router-dom'
import Home from '../../pages/Home/Home.jsx'
import Login from '../../pages/Login/Login'
import Register from '../../pages/Register/Register'
import Shop from '../../pages/Shop/Shop'
import serverStore from '../../store/serverStore.js'
import { observer } from 'mobx-react-lite'
import { useState, useEffect } from 'react';
import alertify from 'alertifyjs'

const Header = observer(() => {

    function ggg() {
        alertify.alert('Ну кайф же нє?', 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Inventore, officiis! In obcaecati fugit reprehenderit consequuntur eos iste accusamus perspiciatis, inventore voluptatum quis necessitatibus facere accusantium repellendus, doloremque ipsa mollitia repellat', function () { alertify.success('фокус покус'); });
    }

    return (
        <header className="header">
            <div className="header__logo" onClick={ggg}>Moto Emporium
                {/* for developers */}
                <span style={{ padding: "0 0 0 80px", textDecorationLine: 'underline', color: 'crimson' }}>auth: {serverStore.userIsAuth == true ? 'true' : 'false'}</span>
            </div>
            <div className="header__wrap">

                <ul className='header__nav'>
                    {/* <span>
                        <NavLink className='nav-item main-link for-dev' to='/login' element={<Login />}>Логін</NavLink>
                        <NavLink className='nav-item main-link for-dev' to='/register' element={<Login />}>Реєстрація</NavLink>
                    </span> */}
                    <NavLink className='nav-item main-link' to='/home' element={<Home />}>Головна</NavLink>
                    <NavLink className='nav-item main-link' to='/shop' element={<Shop />}>Каталог</NavLink>
                    <button style={{ display: serverStore.userIsAuth == true ? 'block' : 'none' }} onClick={() => serverStore.unLogin()} className='nav-item main-link disabled'>Вийти <i class="fs-4 bi bi-door-open-fill"></i> </button>
                </ul>

                <div className='header__user'>
                    {
                        serverStore.userIsAuth == true ?
                            <div>
                                <div className="decoration"></div>
                                <div className='text'>{serverStore.UserName}</div>
                            </div>
                            :
                            <NavLink to='/login' element={<Login />}>
                                <button className='default-btn_1 header__login'>
                                    Login
                                </button></NavLink>
                    }
                </div>
            </div>

        </header>
    )
})

export default Header