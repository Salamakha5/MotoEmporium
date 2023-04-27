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
import { useTranslation } from 'react-i18next';

const Header = observer(() => {

    const { t, i18n } = useTranslation();
    const changeLanguage = (language) => {
        i18n.changeLanguage(language);
    }

    function ggg() {
        alertify.alert('', 'шось', function () { alertify.success('фокус покус'); });
    }

    const activeLink = ({ isActive }) => (isActive ? 'nav-item main-link active' : 'nav-item main-link')

    return (

        <header className="header navbar navbar-expand-xl">

            <div className="header__logo" onClick={ggg}>Moto Emporium</div>

            <button className="header__mobileBtn | navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#headerToggler" aria-controls="headerToggler" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse " id="headerToggler">
                <div className="header__wrap">
                    <div className='header__nav'>
                        <NavLink className={activeLink} to='/' element={<Home />}>{t('header.homeLink')}</NavLink>
                        <NavLink className={activeLink} to='/shop' element={<Shop />}>{t('header.shopLink')}</NavLink>
                        <NavLink className={activeLink} to='/blog' element={<Blog />}>{t('header.blogLink')}</NavLink>
                        <NavLink className={activeLink} to='/contact' element={<Contact />}>{t('header.contactsLink')}</NavLink>
                        <div className='header__nav-dropdown'>
                            <button type="button" className="header__nav-dropdownBtn main-link nav-item | btn dropdown-toggle"
                                data-bs-toggle="dropdown" aria-expanded="false"
                            >{t('header.actions.actionsBtnName')}</button>
                            <ul className="dropdown-menu">
                                <li className='dropdown-item'> <i className="bi bi-cart3 pe-2"></i> {t('header.actions.actionsCart')} </li>
                                <li className='dropdown-item'> <i className="bi bi-gear pe-2"></i> {t('header.actions.actionsSettings')} </li>
                                <li className='d-flex justify-content-center'>
                                    <button className='py-2 px-3 me-1' onClick={() => changeLanguage("ua")}>UA</button>
                                    <button className='py-2 px-3' onClick={() => changeLanguage("en")}>EN</button>
                                </li>
                                <li className='d-flex justify-content-center'>
                                    <button className='main-link exitButton | w-100'
                                        style={{ display: serverStore.userIsAuth == true ? 'block' : 'none' }}
                                        onClick={() => serverStore.unLogin()}
                                    >{t('header.actions.actionsExit')} <i className="fs-4 bi bi-door-open-fill"></i> </button>
                                </li>
                            </ul>
                        </div>
                    </div>
                    {
                        serverStore.userIsAuth == true ?
                            <div className='header__user'>
                                <div className="decoration"></div>
                                <div className='text'>{serverStore.UserName}</div>
                                {/* <div className='text'>Lorem ipsum dolor Lorem ipsum dolor Lorem ipsum dolor Lorem Lorem.Lorem..</div> */}
                            </div>
                            :
                            <div style={{ maxWidth: "350px" }} className='header__user'>
                                <NavLink to='/login' element={<Login />}>
                                    <button className='mainButton header__login-btn py-3 px-5'>{t('header.loginBtn')}</button>
                                </NavLink>
                            </div>
                    }
                </div>
            </div>


        </header>
    )
})

export default Header