import './NotFound.scss'

import notFound_bg from '../../images/notFound.png'

import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom'

import Home from '../Home/Home'


const NotFound = () => {
    return (
        <div className="notFound">
            <div className="notFound__wrap">
                <div>
                    <div className="notFound__title">Oops...</div>
                    <div className="notFound__suptitle">Page not found</div>
                    <div className="notFound__text">Unfortunately, the page you’re looking for is either under maintenance, unaccessible, or there’s a server problem in our site. Please go back to home page.</div>
                    <div className="notFound__back">
                        <NavLink to='/home' element={<Home />}>Go back to Home</NavLink>
                    </div>
                </div>
            </div>
            <img className="notFound__bg" src={notFound_bg} alt="fallen driver :(" />
        </div>
    )
}

export default NotFound;