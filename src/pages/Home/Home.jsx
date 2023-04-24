import './Home.scss'

import hero_bg from '../../images/hero_img.png'
import sales_bg from '../../images/sale_img.png'
import why_us from '../../images/why_us.png'
import our_showroom from '../../images/our_showroom.png'
import test_ride from '../../images/test_ride.png'
import our_service from '../../images/our_service.png'
import custom_parts from '../../images/custom_parts.png'
import our_finance from '../../images/finance.png'

import { useEffect } from 'react'
import { NavLink } from 'react-router-dom'

const Home = () => {
    useEffect(() => {
        document.title = "Home - MotoEmporium";

    }, [])

    return (
        <div className="home">
            <div className="hero">
                <img className='hero__bg' src={hero_bg} />
                <div className="hero__info">
                    <div className="title">Знайдіть тут мотоцикл своєї мрії!</div>
                    <div className="text">У нас є 100+ колекцій нових та вживаних мотоциклів з великих імен, таких як Honda, Kawasaki, Yamaha, Ducati тощо.</div>
                    <div className="link-cont">
                        <NavLink to={'/shop'} element={<Home />}><span className='main-link link'>Давайте знайдемо його</span></NavLink>
                    </div>
                </div>
            </div>

            <div className="sales">
                <img className='sales__bg' src={sales_bg} alt="#" />
                <div className="sales__title">Будьте готові до літньої їзди</div>
                <div className="sales__text">Збережіть себе до 20% знижки на покупці цього літа</div>
                <div className="sales__date">Дійсна до 31 серпня 2022 року</div>
            </div>

            <div className="why-us | row">
                <div className="why-us__img-cont | col-md-12 col-lg-6">
                    <img src={why_us} alt="#" />
                </div>
                <div className='col-md-12 col-lg-6'>
                    <div className="why-us__title">Чому ми?</div>
                    <div className="why-us__p">
                        Починаючи з 2019 року, Twowelers продає сотні мотоциклів, які гарячі для дорог за розумну ціну.Від низького розміру двигуна до більшого двигуна, у нас є все.Хочете насолодитися заходом сонця на дорозі, або ви просто швидкісна виродка, яка любить змагатися проти своїх друзів на іподромі?Ви знайдете мотоцикл, який вам підходить.
                    </div>
                    <div className="why-us__p">
                        Наші співробітники - найкращі на полі з багатьма досвідом на мотоциклі та тоннам знань про це, тому приходьте до нас і не соромтеся задавати нам питання.Ми вітаємо тих, хто новачок з мотоциклом, і дивуємось, як почуватися досліджувати місця на мотоциклі.
                    </div>
                </div>
            </div>

            <div className="our-showroom">
                <div className="our-showroom__left">
                    <div className="big-img" text-on-img='OUR SHOWROOM'>
                        <img src={our_showroom} />
                    </div>
                </div>
                <div className="our-showroom__right">
                    <div className="small-imgGroup">
                        <div className='small-imgCont' text-on-img='TEST RIDE'><img src={test_ride} /></div>
                        <div className='small-imgCont' text-on-img='OUR SERVICE'><img src={our_service} /></div>
                        <div className='small-imgCont' text-on-img='CUSTOM PARTS'><img src={custom_parts} /></div>
                        <div className='small-imgCont' text-on-img='FINANCE'><img src={our_finance} /></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home