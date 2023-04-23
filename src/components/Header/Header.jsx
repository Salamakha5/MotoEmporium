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

        // <nav class="navbar navbar-expand-lg bg-light">
        //         <div class="container-fluid">
        //             <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
        //                 <span class="navbar-toggler-icon"></span>
        //             </button>
        //             <div class="collapse navbar-collapse" id="navbarTogglerDemo01">
        //                 <a class="navbar-brand" href="#">Hidden brand</a>
        //                 <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        //                     <li class="nav-item">
        //                         <a class="nav-link active" aria-current="page" href="#">Home</a>
        //                     </li>
        //                     <li class="nav-item">
        //                         <a class="nav-link" href="#">Link</a>
        //                     </li>
        //                     <li class="nav-item">
        //                         <a class="nav-link disabled">Disabled</a>
        //                     </li>
        //                 </ul>
        //                 <form class="d-flex" role="search">
        //                     <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
        //                     <button class="btn btn-outline-success" type="submit">Search</button>
        //                 </form>
        //             </div>
        //         </div>
        //     </nav>

        <header className="header navbar navbar-expand-xl">

            <div className="header__logo" onClick={ggg}>Moto Emporium</div>

            <button class="header__mobileBtn | navbar-toggler me-2" type="button" data-bs-toggle="collapse" data-bs-target="#headerToggler" aria-controls="headerToggler" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse " id="headerToggler">
                <div className="header__wrap">
                    <div className='header__nav'>
                        <NavLink className={activeLink} to='/' element={<Home />}>Головна</NavLink>
                        <NavLink className={activeLink} to='/shop' element={<Shop />}>Каталог</NavLink>
                        <NavLink className={activeLink} to='/blog' element={<Blog />}>Блог</NavLink>
                        <NavLink className={activeLink} to='/contact' element={<Contact />}>Контакти</NavLink>
                        <div className='header__nav-dropdown'>
                            <button type="button" class="header__nav-dropdownBtn main-link nav-item | btn dropdown-toggle"
                                data-bs-toggle="dropdown" aria-expanded="false"
                            >Дії</button>
                            <ul class="dropdown-menu">
                                <li className='dropdown-item'> <i class="bi bi-cart3 pe-2"></i> Корзина </li>
                                <li className='dropdown-item'> <i class="bi bi-gear pe-2"></i> Налаштування </li>
                                <li className='d-flex justify-content-center'>
                                    <button className='main-link exitButton | w-100'
                                        style={{ display: serverStore.userIsAuth == true ? 'block' : 'none' }}
                                        onClick={() => serverStore.unLogin()}
                                    >Вийти <i className="fs-4 bi bi-door-open-fill"></i> </button>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className='header__user'>
                        {
                            serverStore.userIsAuth == true ?
                                <div>
                                    <div className="decoration"></div>
                                    <div className='text'>{serverStore.UserName}</div>
                                    {/* <div className='text'>Lorem ipsum dolor sit amet.</div> */}
                                </div>
                                :
                                <NavLink to='/login' element={<Login />}>
                                    <button className='default-btn_1 header__login-btn'>
                                        Login
                                    </button>
                                </NavLink>
                        }
                    </div>
                </div>
            </div>


        </header>
    )
})

export default Header