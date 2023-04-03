
import './Register.scss';

import moto_bg from '../../images/logReg_bg.png';
import language_img from '../../images/icons/choice_flag-en.png';
import show_password from '../../images/icons/show_password.png';

import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom'

import Login from '../Login/Login'
import Home from '../Home/Home'

function Register() {
    return (
        <div className="register">
            <div className="register__img-title">two wheelers</div>
            <img className="register__bg-img" src={moto_bg} alt='biker in offroad' />
            <div className="register-form">

                <div className="choose-language">
                    <img src={language_img} alt="flag" />
                    <select className="form-select choose-language__select" name="choose-language">
                        <option value="en">ENG</option>
                        <option value="ua">UA</option>
                    </select>
                </div>

                <div className="form-wrap">
                    <div className="register-form__title">Create on account</div>
                    <div className="register-form__suptitle">Already have an account?
                        <NavLink to='/login' element={<Login />}>
                            <a className="main-link"> Login </a>
                        </NavLink>
                        here</div>
                    {/* =============== */}
                    <input type="text" name="firstName" id="firstName" className="form-control forms_bot_line register-form__firstName" placeholder="Full name" />

                    <input type="email" name="regEmail" id="regEmail" className="form-control forms_bot_line register-form__email" placeholder="Email" />

                    <div className="password-wrap">
                        <input type="password" name="regPassword" id="regPassword" className="form-control forms_bot_line register-form__password" placeholder="Password" />
                        <button className="btn-show_password"><img src={show_password} /></button>
                    </div>

                    <div className="password-wrap">
                        <input type="password" name="confirmPassword" id="confirmPassword" className="form-control forms_bot_line register-form__confirmPassword" placeholder="Confirm Password" />
                        <button className="btn-show_password"><img src={show_password} /></button>
                    </div>

                    <div class="iAgree-wrap">
                        <input class="form-check-input" type="checkbox" id="iAgree" />
                        <label class="form-check-label" for="iAgree">I agree to store’s Terms and Conditions</label>
                    </div>
                    {/* =============== */}
                    <div className="btn-cont">
                        <NavLink to='/' element={<Home />}>
                            <button className="default-btn_1 register-form__submit" type="submit">
                                Register Account (на головну)
                            </button>
                        </NavLink>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default Register;