import './NotFound.scss'

import notFound_bg from '../../images/notFound.png'

import Home from '../Home/Home'
import serverStore from '../../store/serverStore.js'
import clientStore from '../../store/clientStore'

import { NavLink } from 'react-router-dom'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next';

const NotFound = () => {

    const { t } = useTranslation();

    useEffect(() => {
        document.title = "Page Not Found | MotoEmporium";
    }, [])

    return (

        <div className="notFound">
            <div className="notFound__wrap">
                <div>
                    {serverStore.tokenDecoded == false ?
                        <>
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
                            <div className="notFound__suptitle">{t('notFound_page.waitPlease')}</div>
                            <div className="notFound__text">{t('notFound_page.orTry')}</div>
                            <NavLink to='/' element={<Home />}>
                                <div className="notFound__back">{t('notFound_page.btn-back')}</div>
                            </NavLink>
                        </>
                        :
                        <>
                            <div className="notFound__title">{t('notFound_page.title')}</div>
                            <div className="notFound__suptitle">{t('notFound_page.suptitle')}</div>
                            <div className="notFound__text">{t('notFound_page.text')}</div>
                            <NavLink to='/' element={<Home />}>
                                <div className="notFound__back">{t('notFound_page.btn-back')}</div>
                            </NavLink>
                        </>}

                </div>
            </div>
            <img className="notFound__bg" src={notFound_bg} alt="fallen driver :(" />
        </div>
    )
}

export default NotFound;