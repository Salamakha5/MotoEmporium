
import './Login.scss';

import moto_bg from '../../images/logReg_bg.png';
import language_img from '../../images/icons/choice_flag-en.png';

import Register from '../Register/Register'

import { BrowserRouter as Router, NavLink } from 'react-router-dom'
import serverStore from '../../store/serverStore';
import { observer } from 'mobx-react-lite';
import { useState } from 'react';
import { useFormik } from "formik";
import * as Yup from "yup"


const Login = observer(() => {
    // const [iconsLock1, setIconsLock1] = useState("bi bi-lock-fill")
    const [iconsLock1, setIconsLock1] = useState("bi bi-eye-fill")
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        onSubmit: function (value) {
            alert("Submit!")
            console.log(formik);
        },
        validationSchema: Yup.object({
            email: Yup.string().required("Не заповнене").email("Eлектронна адреса має бути дійсною!"),
            password: Yup.string().required("Не заповнене").min(3, "Пароль має містити від 3 сим.")
        })

    })
    function requestToStore() {
        console.log(serverStore.userIsAuth);
        const { email, password } = formik.values
        serverStore.loginUser(email, password)
    }

    function changeIconsClass(e) {
        // if (e.target.id == "button1") { iconsLock1 == "bi bi-lock-fill" ? setIconsLock1("bi bi-unlock-fill") : setIconsLock1("bi bi-lock-fill") }
        if (e.target.id == "button1") { iconsLock1 == "bi bi-eye-slash-fill" ? setIconsLock1("bi bi-eye-fill") : setIconsLock1("bi bi-eye-slash-fill") }
    }
    return (
        <div className="login" >
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

                <form className="form-wrap" onSubmit={formik.handleSubmit}>
                    <div className="login-form__title">Log in</div>
                    <div className="login-form__suptitle">New visitor?
                        <NavLink to='/register' element={<Register />}>
                            <span className="main-link"> Create your account </span>
                        </NavLink>here</div>
                    {/* =============== */}
                    <input type="text" name="email" id="email" className="form-control forms_bot_line login-form__email" placeholder="Email"
                        onChange={formik.handleChange} value={formik.values.email} />
                    <label className='error'>{formik.errors.email ? formik.errors.email : ""}</label>
                    <div className="password-wrap">
                        <input type={iconsLock1 == "bi bi-eye-slash-fill" ? "password" : "text"} name="password" id="password" className="form-control forms_bot_line login-form__password" placeholder="Password"
                            onChange={formik.handleChange} value={formik.values.password} />
                        
                        <button type='button' onClick={changeIconsClass} className="btn-show_password"><i id="button1" class={"fs-3 " + iconsLock1}></i></button>
                    </div>
                    <label className='error'>{formik.errors.password ? formik.errors.password : ""}</label>
                    {/* =============== */}
                    <div className="login-form__forgot">Click <span className="main-link">here</span> in case you forgot your password</div>
                    <div className='ErrorApi'>{serverStore.loginError}</div>
                    <div className="btn-cont mt-4">
                        <NavLink to="/home" onClick={requestToStore} className={formik.isValid && formik.dirty ? "btn default-btn_1 register-form__submit " : " btn default-btn_1 register-form__submit disabled "} aria-disabled="true" role="submit" data-bs-toggle="button">Login</NavLink>
                    </div>
                </form>

            </div>
        </div>

    );
})

export default Login;