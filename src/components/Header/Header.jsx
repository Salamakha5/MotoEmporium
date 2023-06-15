import './Header.scss'

import Home from '../../pages/Home/Home.jsx'
import Login from '../../pages/Login/Login'
import Shop from '../../pages/Shop/Shop'
import Blog from '../../pages/Blog/Blog'
import Contact from '../../pages/Contact/Contact'
import BasketPage from '../../pages/Basket/BasketPage'
import serverStore from '../../store/serverStore.js'
import clientStore from '../../store/clientStore'

import { NavLink, useNavigate } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import alertify from 'alertifyjs'
import { useTranslation } from 'react-i18next'
import { useEffect } from 'react'

const Header = observer(() => {

    const { t, i18n } = useTranslation();
    const changeLanguage = (language) => {
        clientStore.currentLang = language
        i18n.changeLanguage(language)
    }
    const navigate = useNavigate()

    useEffect(() => {
        if (localStorage.i18nextLng !== 'ua') {
            changeLanguage("en")
        }
    }, [])

    const logoLink = () => {
        navigate('/')
    }

    const activeLink = ({ isActive }) => (isActive ? 'nav-item main-link active' : 'nav-item main-link')

    const langSwitchHandler = () => {
        if (i18n.language == 'en') {
            changeLanguage("ua")
        } else {
            changeLanguage("en")
        }
    };

    function exitHandler() {
        alertify.confirm(t('header.modal_windows.exit-title'), t('header.modal_windows.exit-text'),
            function () {
                serverStore.unLogin()
                navigate('/')
            },
            function () { alertify.success(t('header.modal_windows.exit-notify')) });
    }

    return (

        <header className="header navbar navbar-expand-xl" id='headerArchor'>

            {
                // авторизація при декодуванні
                serverStore.tokenDecoded == false ?
                    <div className='decodedInfo-cont'>
                        <div className='decodedInfo'>
                            {
                                clientStore.currentLang == "ua" ? "Авторизація" : "Authorization"
                            }
                        </div>
                        <div className="loader active" id="loader-2">
                            {/* то малесенький лоадер */}
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                    </div>
                    : false
            }

            <div className="header__logo" onClick={logoLink}>{
                window.location.pathname === '/admin' ? "ME Admin" : "Moto Emporium"
            }</div>

            <button className="header__mobileBtn | navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#headerToggler" aria-controls="headerToggler" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse " id="headerToggler">
                <div className="header__wrap">
                    <div className='header__nav'>
                        <NavLink className={activeLink} to='/' element={<Home />}>{t('header.homeLink')}</NavLink>
                        <NavLink className={activeLink} to='/blog' element={<Blog />}>{t('header.blogLink')}</NavLink>
                        <div className='shop-item'>
                            <NavLink className={activeLink} to='/shop' element={<Shop />}
                                style={serverStore.userIsAuth == true ? { paddingRight: "55px" } : { paddingRight: "35px" }}>
                                {t('header.shopLink')}</NavLink>
                            {
                                serverStore.userIsAuth == true ?
                                    <NavLink className={activeLink} to='/basket' element={<BasketPage />}><i className="fs-3 bi bi-cart3"></i></NavLink>
                                    :
                                    false
                            }
                        </div>
                        <NavLink className={activeLink} to='/contact' element={<Contact />}>{t('header.contactsLink')}</NavLink>
                        <div className='header__nav-dropdown '>
                            <button type="button" className="header__nav-dropdownBtn main-link nav-item | btn dropdown-toggle"
                                data-bs-toggle="dropdown" aria-expanded="false"
                            >{t('header.actions.actionsBtnName')}</button>
                            <ul className="dropdown-menu dropdown-menu-end dropdown-menu-lg-end">
                                <li className='dropdown-item'>
                                    {
                                        serverStore.userIsAuth ?
                                            <NavLink className="dropdown-navLink" to="office" ><i className="bi bi-person-circle me-2"></i>{t("header.actions.actionsOffis")}</NavLink>
                                            :
                                            <NavLink className="dropdown-navLink" to="login" ><i className="bi bi-person-circle me-2"></i>{t("header.actions.actionsOffis")}</NavLink>
                                    }
                                </li>
                                <li className='dropdown-item'>
                                    {
                                        serverStore.haveAdminRoots == true ?
                                            <NavLink className="dropdown-navLink" to="admin" ><i className="bi bi-person-fill-gear me-2"></i>{t("header.actions.actionsAdmin")}</NavLink>
                                            :
                                            <div className="dropdown-navLink disabled-admin"><i className="bi bi-person-fill-exclamation me-2"></i>{t("header.actions.actionsAdmin")}</div>
                                    }
                                </li>
                                <li className='d-flex justify-content-center'>
                                    <div className="lang-switcher | form-switch">
                                        <div className='lang lang-en'>EN</div>
                                        <input className="form-check-input" id='headerLangSwitcher' type="checkbox" role="switch"
                                            onClick={langSwitchHandler} defaultChecked={localStorage.i18nextLng == 'ua'} />
                                        <div className='lang lang-ua'>UA</div>
                                    </div>
                                </li>
                                <li className='d-flex justify-content-center'>
                                    <button className='main-link exitButton | w-100'
                                        style={{ display: serverStore.userIsAuth == true ? 'block' : 'none' }}
                                        onClick={exitHandler}
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
        </header >
    )
})

export default Header