
import './Login.scss';

import moto_bg from '../../images/logReg_bg.png';
import flag_en from '../../images/icons/choice_flag-en.png';
import flag_ua from '../../images/icons/choice_flag-ua.png';

import Register from '../Register/Register'
import serverStore from '../../store/serverStore';

import { BrowserRouter as Router, Link } from 'react-router-dom'
import { observer } from 'mobx-react-lite';
import { useState, useEffect } from 'react';
import { useFormik } from "formik";
import * as Yup from "yup"
import alertify from 'alertifyjs'
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import Home from '../Home/Home';
import { useTranslation } from 'react-i18next';


const Login = observer(() => {
    const [showPageLoader, setShowPageLoader] = useState(false)
    const [loginAnswer, setLoginAnswer] = useState('')
    const navigate = useNavigate()
    const [iconsLock1, setIconsLock1] = useState("bi bi-eye-fill")

    useEffect(() => {
        document.title = "Login | MotoEmporium";
    }, [])

    const { t, i18n } = useTranslation();
    const changeLanguage = (language) => { i18n.changeLanguage(language) }

    const formik = useFormik({
        initialValues: {
            email: '',
            // password: ''
            password: 'testpassword'
        },
        validationSchema: Yup.object({
            email: Yup.string().required(t('yupErrors.required')).email(t('yupErrors.valid-email')).max(20, t('yupErrors.valid-maxLength', { num: 20 })),
            password: Yup.string().required(t('yupErrors.required')).min(5, t('yupErrors.valid-password', { num: 5 })).max(20, t('yupErrors.valid-maxLength', { num: 20 }))
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

                serverStore.decodedToken(localStorage.getItem("IsAuthMOTO"), (decodedResult) => {
                    if (decodedResult === 'succes') {
                        serverStore.tokenDecoded = true
                    } else {
                        alertify.alert("Я помилка логіну");
                    }
                    console.log('помилка в логіні:', decodedResult);
                });

            }, (error) => {
                setShowPageLoader(false);

                console.log(error.response.data.massage);

                switch (error.response.data.massage) {
                    case 'Не правильний пароль':
                        setLoginAnswer(t('login.apiAnswers.password-wrong'))
                        break;
                    case 'Такого користувача не знайдено':
                        setLoginAnswer(t('login.apiAnswers.user-notFound'))
                        break;
                    default:
                        setLoginAnswer('')
                        break;
                }
            });
    }

    function chooseLangHandler(e) { changeLanguage(`${e.target.value}`) }

    function forgotHandler() { alertify.alert(t('login.forgot-alert-title'), t('login.forgot-alert-text')); }

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
                    <img src={localStorage.i18nextLng == "ua" ? flag_ua : flag_en} alt="flag" />
                    <select className="form-select choose-language__select" name="choose-language"
                        onChange={chooseLangHandler} defaultValue={localStorage.i18nextLng}>
                        <option value="en">ENG</option>
                        <option value="ua">UA</option>
                    </select>
                </div>

                <form className="form-wrap">
                    <div className="login-form__title">{t('login.title')}</div>
                    <div className="login-form__suptitle">
                        <span>{t('login.suptitle-1')} <Link to='/' element={<Home />} className="main-link"> {t('login.suptitle-toMain')} </Link></span>
                        <hr style={{ height: "1px", margin: "5px 0" }}></hr>
                        <span>{t('login.suptitle-2')} <Link to='/register' element={<Register />} className="main-link"> {t('login.suptitle-2_link')} </Link> {t('login.suptitle-2_p2')}</span>
                    </div>
                    {/* fields */}
                    <input type="text" name="email" id="email" className="form-control forms_bot_line login-form__email" placeholder={t('login.email-placeholder')}
                        onChange={formik.handleChange} value={formik.values.email} />
                    <label className='error'>{formik.errors.email ? formik.errors.email : ""}</label>
                    <div className="password-wrap">
                        <input type={iconsLock1 == "bi bi-eye-fill" ? "password" : "text"} name="password" id="password" className="form-control forms_bot_line login-form__password" placeholder={t('login.password-placeholder')}
                            onChange={formik.handleChange} value={formik.values.password} />

                        <button type='button' onClick={changeIconsClass} className="btn-show_password"><i id="button1" className={"fs-3 " + iconsLock1}></i></button>
                        <label className='error'>{formik.errors.password ? formik.errors.password : ""}</label>
                    </div>
                    {/* =============== */}
                    <div className="login-form__hints">
                        <span>{t('login.form.hint')} <span className="main-link" onClick={forgotHandler}>{t('login.form.hint_link')}</span> {t('login.form.hint_p2')} </span>
                    </div>
                    <div className='ErrorApi'>{loginAnswer}</div>
                    <div className="btn-cont mt-4">
                        <button
                            onClick={loginUser}
                            className={formik.isValid && formik.dirty ? "btn mainButton register-form__submit py-3 px-5" : "btn mainButton register-form__submit py-3 px-5 disabled "}
                            aria-disabled="true" role="submit" data-bs-toggle="button"
                        >{t('login.form.submitBtn')}</button>
                    </div>
                </form>

            </div>
        </div>

    );
})

export default Login;