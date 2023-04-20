
import './Login.scss';

import moto_bg from '../../images/logReg_bg.png';
import language_img from '../../images/icons/choice_flag-en.png';

import Register from '../Register/Register'
import serverStore from '../../store/serverStore';

import { BrowserRouter as Router, Link } from 'react-router-dom'
import { observer } from 'mobx-react-lite';
import { useState } from 'react';
import { useFormik } from "formik";
import * as Yup from "yup"
import alertify from 'alertifyjs'
import { useNavigate } from "react-router-dom";
import axios from 'axios';


const Login = observer(() => {
    const [showPageLoader, setShowPageLoader] = useState(false)
    const [loginAnswer, setLoginAnswer] = useState('')
    // const loaderClass = showPageLoader == true ? 'loader-pageWrap active' : 'loader-pageWrap'
    const navigate = useNavigate()
    const [iconsLock1, setIconsLock1] = useState("bi bi-eye-fill")

    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema: Yup.object({
            email: Yup.string().required("Не заповнене").email("Eлектронна адреса має бути дійсною!"),
            password: Yup.string().required("Не заповнене").min(5, "Пароль має містити від 5 сим.")
        })
    })

    function changeIconsClass(e) { if (e.target.id == "button1") { iconsLock1 == "bi bi-eye-slash-fill" ? setIconsLock1("bi bi-eye-fill") : setIconsLock1("bi bi-eye-slash-fill") } }

    function loginUser() {
        const { email, password } = formik.values
        setShowPageLoader(true);

        axios.post(`${serverStore.URL}/login`, {
            email: `${email}`,
            password: `${password}`
        })
            .then((response) => {
                serverStore.userIsAuth = response.data.isAuth
                setShowPageLoader(false);
                localStorage.setItem("IsAuthMOTO", response.data.token)
                navigate('/')
                serverStore.decodedToken(localStorage.getItem("IsAuthMOTO"));
            }, (error) => {
                setShowPageLoader(false);
                setLoginAnswer(error.response.data.massage)
                // loginError = error.response.data.massage
            });
    }

    function forgotHandler() {
        alertify.alert('Співчуття', `Пом'янем :(`);
    }


    return (
        <div className="login" >
            <div className={showPageLoader == true ? 'loader-pageWrap active' : 'loader-pageWrap'}>
                <div className="loader active" id="loader-2">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>

            <div className="login__img-logo">MotoEmporium</div>
            <img className="login__bg-img" src={moto_bg} alt='biker in offroad' />
            <div className="login-form">

                <div className="choose-language">
                    <img src={language_img} alt="flag" />
                    <select className="form-select choose-language__select" name="choose-language">
                        <option value="en">ENG</option>
                        <option value="ua">UA</option>
                    </select>
                </div>

                <form className="form-wrap">
                    <div className="login-form__title">Авторизація</div>
                    <div className="login-form__suptitle">Новий відвідувач?
                        <Link to='/register' element={<Register />} className="main-link"><span> Створити новий обліковий запис </span></Link>тут</div>
                    {/* =============== */}
                    <input type="text" name="email" id="email" className="form-control forms_bot_line login-form__email" placeholder="Пошта"
                        onChange={formik.handleChange} value={formik.values.email} />
                    <label className='error'>{formik.errors.email ? formik.errors.email : ""}</label>
                    <div className="password-wrap">
                        <input type={iconsLock1 == "bi bi-eye-fill" ? "password" : "text"} name="password" id="password" className="form-control forms_bot_line login-form__password" placeholder="Пароль"
                            onChange={formik.handleChange} value={formik.values.password} />

                        <button type='button' onClick={changeIconsClass} className="btn-show_password"><i id="button1" className={"fs-3 " + iconsLock1}></i></button>
                    </div>
                    <label className='error'>{formik.errors.password ? formik.errors.password : ""}</label>
                    {/* =============== */}
                    <div className="login-form__forgot">Клацніть <span className="main-link" onClick={forgotHandler}>тут</span> якщо ви забули свій пароль</div>
                    <div className='ErrorApi'>{loginAnswer}</div>
                    <div className="btn-cont mt-4">
                        <button
                            onClick={loginUser}
                            className={formik.isValid && formik.dirty ? "btn default-btn_1 register-form__submit " : " btn default-btn_1 register-form__submit disabled "}
                            aria-disabled="true" role="submit" data-bs-toggle="button"
                        >Авторизація</button>
                    </div>
                </form>

            </div>
        </div>

    );
})

export default Login;