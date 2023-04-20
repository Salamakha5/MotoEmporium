import './Header.scss'

import Home from '../../pages/Home/Home.jsx'
import Login from '../../pages/Login/Login'
import Shop from '../../pages/Shop/Shop'
import serverStore from '../../store/serverStore.js'
import Blog from '../../pages/Blog/Blog'

import { NavLink } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import alertify from 'alertifyjs'
import Contact from '../../pages/Contact/Contact'

const Header = observer(() => {

    function ggg() {
        alertify.alert('', 'пасхалка', function () { alertify.success('фокус покус'); });
    }

    const activeLink = ({ isActive }) => (isActive ? 'nav-item main-link active' : 'nav-item main-link')

    return (
        <header className="header">
            <div className="header__logo" onClick={ggg}>Moto Emporium</div>
            <div className="header__wrap">

                <ul className='header__nav'>
                    <NavLink className={activeLink} to='/' element={<Home />}>Головна</NavLink>
                    <NavLink className={activeLink} to='/shop' element={<Shop />}>Каталог</NavLink>
                    <NavLink className={activeLink} to='/blog' element={<Blog />}>Блог</NavLink>
                    <NavLink className={activeLink} to='/contact' element={<Contact />}>Контакти</NavLink>
                    <button style={{ display: serverStore.userIsAuth == true ? 'block' : 'none' }} onClick={() => serverStore.unLogin()}
                        className='nav-item main-link disabled'>Вийти <i className="fs-4 bi bi-door-open-fill"></i> </button>
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
                                </button>
                            </NavLink>
                    }
                </div>
            </div>

        </header>
    )
})

export default Header