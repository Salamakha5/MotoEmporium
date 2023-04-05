
import './Register.scss';

import moto_bg from '../../images/logReg_bg.png';
import language_img from '../../images/icons/choice_flag-en.png';
import show_password from '../../images/icons/show_password.png';

import Login from '../Login/Login'
import Home from '../Home/Home'

import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom'
import { useRef } from 'react';
import serverStore from '../../store/serverStore';
import { observer } from 'mobx-react-lite';

const Register = observer(() => {

    const nameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();

    function requestToStore() {
        serverStore.registerUser(nameRef.current.value, emailRef.current.value, passwordRef.current.value)
    }

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
                            <span className="main-link"> Login </span>
                        </NavLink>
                        here</div>
                    {/* =============== */}
                    <form>

                        <input type="text" name="firstName" id="firstName" className="form-control forms_bot_line register-form__firstName" placeholder="Full name"
                            ref={nameRef} />

                        <input type="email" name="regEmail" id="regEmail" className="form-control forms_bot_line register-form__email" placeholder="Email"
                            ref={emailRef} />

                        <div className="password-wrap">
                            <input type="password" name="regPassword" id="regPassword" className="form-control forms_bot_line register-form__password" placeholder="Password"
                                ref={passwordRef} />
                            <button className="btn-show_password"><img src={show_password} /></button>
                        </div>

                        <div className="password-wrap">
                            <input type="password" name="confirmPassword" id="confirmPassword" className="form-control forms_bot_line register-form__confirmPassword" placeholder="Confirm Password" />
                            <button className="btn-show_password"><img src={show_password} /></button>
                        </div>

                        <div className="iAgree-wrap">
                            <input className="form-check-input" type="checkbox" id="iAgree" />
                            <label className="form-check-label" htmlFor="iAgree">I agree to store’s Terms and Conditions</label>
                        </div>
                        {/* =============== */}
                        <div className="btn-cont">
                            {/* <NavLink to='/' element={<Home />}> */}
                            <button className="default-btn_1 register-form__submit" type="submit"
                                onClick={requestToStore}>
                                Register Account
                            </button>
                            {/* </NavLink> */}
                        </div>
                    </form>

                </div>

            </div>
        </div>
    );
})

export default Register;