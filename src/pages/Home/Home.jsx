import './Home.scss'

import hero_bg from '../../images/hero_img.png'
import sales_bg from '../../images/sale_img.png'
import why_us from '../../images/why_us.png'
import our_showroom from '../../images/our_showroom.png'
import test_ride from '../../images/test_ride.png'
import our_service from '../../images/our_service.png'
import custom_parts from '../../images/custom_parts.png'
import our_finance from '../../images/finance.png'

// import Register from '../Register/Register.jsx';
// import Login from '../Login/Login.jsx';
// import NotFound from '../NotFound/NotFound.jsx';
// import Layot from '../../components/Layot/Layot.jsx';

import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom'

const Home = () => {
    return (
        <div className="home">
            <div className="hero">
                <img className='hero__bg' src={hero_bg} alt="biker in hills" />
                <div className="hero__info">
                    <div className="title">Find your dream motorcycle here!</div>
                    <div className="text">We have 100+ collections of new and used motorcycles from big names such as Honda, Kawasaki, Yamaha, Ducati, etc. We will give the best price you can get and great quality motorcycle.</div>
                    <div className="link-cont">
                        <NavLink to={'/home'} element={<Home />}><span className='main-link link'>Let's find one</span></NavLink>
                    </div>
                </div>
            </div>
            <div className="sales">
                <img className='sales__bg' src={sales_bg} alt="#" />
                <div className="sales__title">GET READY FOR YOUR SUMMER RIDE</div>
                <div className="sales__text">Save yourself up to 20% off on your purchase this summer</div>
                <div className="sales__date">Valid until August 31, 2022</div>
            </div>
            <div className="why-us">
                <div className="why-us__img-cont">
                    <img src={why_us} alt="#" />
                </div>
                <div>
                    <div className="why-us__title">Why us?</div>
                    <div className="why-us__p">
                        Since 2019, twowheelers sells hundreds of motorcycles that are hot for the roads for a reasonable price. From low engine size to bigger engine, we have all. Want to enjoy the sunset on the road or you’re just a speed freak who likes to race against your friends on the racetrack? You’ll find the motorcycle that suits you.
                    </div>
                    <div className="why-us__p">
                        Our employees are the best on the field with many experiences on a motorcycle and tons of knowledge about it, so come visit us and do not hesitate to ask us questions. We welcome those who are new with a motorcycle and wonder how it feels to explore places on a motorcycle.
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
                        <div className='small-img' text-on-img='TEST RIDE'><img src={test_ride} /></div>
                        <div className='small-img' text-on-img='OUR SERVICE'><img src={our_service} /></div>
                        <div className='small-img' text-on-img='CUSTOM PARTS'><img src={custom_parts} /></div>
                        <div className='small-img' text-on-img='FINANCE'><img src={our_finance} /></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home