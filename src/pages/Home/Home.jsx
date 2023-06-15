import './Home.scss'

import hero_bg from '../../images/hero_img.png'
import sales_bg from '../../images/sale_img.png'
import why_us from '../../images/why_us.png'
import our_showroom from '../../images/our_showroom.png'
import test_ride from '../../images/test_ride.png'
import our_service from '../../images/our_service.png'
import custom_parts from '../../images/custom_parts.png'
import our_finance from '../../images/finance.png'

import BackUpBtn from '../../components/BackUpBtn/BackUpBtn'

import { useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { useTranslation } from 'react-i18next';
import alertify from 'alertifyjs'

const Home = () => {
    useEffect(() => {
        document.title = "Home | MotoEmporium";
    }, [])

    const { t } = useTranslation();

    const now = new Date();
    const currentYear = now.getFullYear();

    function pathInaccessible() {
        alertify.alert(t('app.oops'), t('footer.textOnClick'))
    }

    return (
        <div className="home">
            <BackUpBtn whenShow='1000' debugLine='false'></BackUpBtn>

            <div className="hero">
                <img className='hero__bg' src={hero_bg} />
                <div className="hero__info">
                    <div className="title">{t('home_page.hero.title')}</div>
                    <div className="text">{t('home_page.hero.text')}</div>
                    <div className="link-cont">
                        <NavLink to={'/shop'} element={<Home />}><span className='main-link link'>{t('home_page.hero.link')}</span></NavLink>
                    </div>
                </div>
            </div>

            <div className="sales">
                <img className='sales__bg' src={sales_bg} alt="#" />
                <div className="sales__title">{t('home_page.sales.title')}</div>
                <div className="sales__text">{t('home_page.sales.text', { sale: '40%' })}</div>
                <div className="sales__date">{t('home_page.sales.date', { date: currentYear })}</div>
            </div>

            <div className="why-us | row">
                <div className="why-us__img-cont | col-md-12 col-lg-6">
                    <img src={why_us} alt="#" />
                </div>
                <div className='col-md-12 col-lg-6'>
                    <div className="why-us__title">{t('home_page.whyUs.title')}</div>
                    <div className="why-us__p">{t('home_page.whyUs.paragraph1')}</div>
                    <div className="why-us__p">{t('home_page.whyUs.paragraph2')}</div>
                </div>
            </div>

            <div className="our-showroom">
                <div className="our-showroom__left">
                    <div className="big-img" onClick={pathInaccessible} text-on-img={t('home_page.ourShowroom.link1')}>
                        <img src={our_showroom} />
                    </div>
                </div>
                <div className="our-showroom__right">
                    <div className="small-imgGroup">
                        <div className='small-imgCont' onClick={pathInaccessible} text-on-img={t('home_page.ourShowroom.link2')}><img src={test_ride} /></div>
                        <div className='small-imgCont' onClick={pathInaccessible} text-on-img={t('home_page.ourShowroom.link3')}><img src={our_service} /></div>
                        <div className='small-imgCont' onClick={pathInaccessible} text-on-img={t('home_page.ourShowroom.link4')}><img src={custom_parts} /></div>
                        <div className='small-imgCont' onClick={pathInaccessible} text-on-img={t('home_page.ourShowroom.link5')}><img src={our_finance} /></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home