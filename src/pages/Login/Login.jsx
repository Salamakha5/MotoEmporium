import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom'

import './Login.scss';

import moto_bg from '../../images/logReg_bg.png';
import language_img from '../../images/icons/choice_flag-en.png';
import show_password from '../../images/icons/show_password.png';

import Register from '../Register/Register'
import Home from '../Home/Home'



function Login() {
    return (
        <div className="login">
            <div className="login__img-title">two wheelers</div>
            <img className="login__bg-img" src={moto_bg} alt='biker in offroad' />
            <div className="login-form">

                <div className="choose-language">
                    <img src={language_img} alt="flag" />
                    <select className="form-select choose-language__select" name="choose-language">
                        <option value="en">ENG</option>
                        <option value="ua">UA</option>
                    </select>
                </div>

                <div className="form-wrap">
                    <div className="login-form__title">Log in</div>
                    <div className="login-form__suptitle">New visitor?
                        <NavLink to='/register' element={<Register />}>
                            <a className="main-link"> Create your account </a>
                        </NavLink>here</div>
                    {/* =============== */}
                    <input type="text" name="logEmail" id="logEmail" className="form-control forms_bot_line login-form__email" placeholder="Email" />

                    <div className="password-wrap">
                        <input type="password" name="logPassword" id="logPassword" className="form-control forms_bot_line login-form__password" placeholder="Password" />
                        <button className="btn-show_password"><img src={show_password} /></button>
                    </div>
                    {/* =============== */}
                    <div className="login-form__forgot">Click <a className="main-link" href="#">here</a> in case you forgot your password</div>
                    <div className="btn-cont">
                        <NavLink to='/' element={<Home />}>
                            <button className="default-btn_1 login-form__submit" type="submit">
                                Login (на головну)
                            </button>
                        </NavLink>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default Login;