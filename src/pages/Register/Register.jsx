import './Register.scss';

import moto_bg from '../../images/logReg_bg.png';
// import flag_en from '../../images/icons/choice_flag-en.png';
import flag_ua from '../../images/icons/choice_flag-ua.png';

import Login from '../Login/Login'

import serverStore from '../../store/serverStore.js';
import { useState, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { useFormik } from "formik";
import * as Yup from "yup"
import alertify from 'alertifyjs'
import { useNavigate, Link } from "react-router-dom";
import axios from 'axios';

const Register = observer(() => {

    const [showPageLoader, setShowPageLoader] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        document.title = "Register - MotoEmporium";
    }, [])

    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: '',
            confirmPassword: ''
        },
        validationSchema: Yup.object({
            name: Yup.string().required("Не заповнене").min(4, "Поле має містити мін. 4 символа!"),
            email: Yup.string().required("Не заповнене").email("Eлектронна адреса має бути дійсною!"),
            password: Yup.string().required("Не заповнене").min(5, "Пароль має містити від 5 символів!"),
            confirmPassword: Yup.string().required("Не заповнене").min(5, "Пароль має містити від 5 символів!"),
        })
    })

    const [eye1, setEye1] = useState("bi bi-eye-fill")
    const [eye2, setEye2] = useState("bi bi-eye-fill")
    function changeEye1(e) { if (e.target.id == "showPassword") { eye1 == "bi bi-eye-slash-fill" ? setEye1("bi bi-eye-fill") : setEye1("bi bi-eye-slash-fill") } }
    function changeEye2(e) { if (e.target.id == "showConfirmPassword") { eye2 == "bi bi-eye-slash-fill" ? setEye2("bi bi-eye-fill") : setEye2("bi bi-eye-slash-fill") } }

    const [iAgree, setiAgree] = useState(false)
    function iAgreeHandler() { iAgree === true ? setiAgree(false) : setiAgree(true) }

    function registerUser() {
        const { name, email, password, confirmPassword } = formik.values
        let registerAnswer = ''

        if (formik.isValid && (password === confirmPassword) && (iAgree === true)) {
            setShowPageLoader(true);

            axios.post(serverStore.URL + '/registration', {
                name: name,
                email: email,
                password: password
            })
                .then((response) => {
                    registerAnswer = response.data.massage

                    if (registerAnswer == 'Успішна реєстрація!') {
                        setShowPageLoader(false)
                        alertify.alert('Успіх', `Користувач ${name} зареєстрований успішно!`, function () {
                            navigate('/login')
                        });
                    }
                })
                .catch((error) => {
                    registerAnswer = error.response.data.massage

                    if (registerAnswer === 'Користувач з такою поштою вже є') {
                        setShowPageLoader(false)
                        alertify.alert('Помилка', 'Користувач з такою поштою вже існує!');
                    }
                    if (registerAnswer === 'Помилка:') {
                        setShowPageLoader(false)
                        alertify.alert(`Помилка`, `${error.response.data.error}`);
                    }
                });

        } else if (password !== confirmPassword) {
            alertify.alert('Помилка', 'Паролі не збігаються!');
        } else if (iAgree == false) {
            alertify.alert('Помилка', 'Ви не погоджуєтесь із умовами нашого сервісу :(');
        }
    }

    return (
        <div className="register">
            <div className={showPageLoader === true ? 'loader-pageWrap active' : 'loader-pageWrap'}>
                <div className="loader active" id="loader-2">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>

            <div className="register__img-logo">MotoEmporium</div>
            <img className="register__bg-img" src={moto_bg} alt='biker in offroad' />
            <div className="register-form">

                <div className="choose-language">
                    <img src={flag_ua} alt="flag" />
                    <select className="form-select choose-language__select" name="choose-language">
                        <option value="ua">UA</option>
                        <option value="en">ENG</option>
                    </select>
                </div>

                <div className="form-wrap">
                    <div className="register-form__title">Створити новий обліковий запис</div>
                    <div className="register-form__suptitle">Вже є аккаунт?
                        <Link to='/login' element={<Login />} className="main-link"> <span>Авторизація</span> </Link>
                        тут
                    </div>

                    <form>

                        <input type="text" onChange={formik.handleChange} name="name" id="name" className="form-control forms_bot_line register-form__firstName" placeholder="Повне ім'я"
                            value={formik.values.name}
                        />
                        <label className='error'>{formik.errors.name ? formik.errors.name : ""}</label>

                        <input type="email" name="email" id="email" className="form-control forms_bot_line register-form__email" placeholder="Електронна пошта"
                            onChange={formik.handleChange}
                            value={formik.values.email}
                        />
                        <label className='error'>{formik.errors.email ? formik.errors.email : ""}</label>

                        <div className="password-wrap">
                            <input type={eye1 == "bi bi-eye-fill" ? "password" : "text"} name="password" id="password" className="form-control forms_bot_line register-form__password" placeholder="Пароль"
                                onChange={formik.handleChange}
                                value={formik.values.password}
                            />
                            <label className='error'>{formik.errors.password ? formik.errors.password : ""}</label>
                            <button onClick={changeEye1} type="button" className="btn-show_password"><i id="showPassword" className={"fs-3 " + eye1}></i></button>
                        </div>

                        <div className="confirmPassword-wrap">
                            <input type={eye2 == "bi bi-eye-fill" ? "password" : "text"} name="confirmPassword" id="confirmPassword" className="form-control forms_bot_line register-form__confirmPassword" placeholder="Підтвердіть пароль"
                                onChange={formik.handleChange}
                                value={formik.values.confirmPassword}
                            />
                            <label className='error'>{formik.errors.confirmPassword ? formik.errors.confirmPassword : ""}</label>
                            <button onClick={changeEye2} type="button" className="btn-show_confirmPassword"><i id="showConfirmPassword" className={"fs-3 " + eye2}></i></button>
                        </div>

                        <div className="iAgree-wrap">
                            <input className="form-check-input" type="checkbox" id="iAgree"
                                onChange={iAgreeHandler}
                            />
                            <label className="form-check-label" htmlFor="iAgree">Я погоджуюсь на умови зберігання моїх данних</label>
                        </div>

                        <div className="btn-cont">
                            <button onClick={registerUser} className={formik.isValid && formik.dirty ? "btn default-btn_1 register-form__submit" : "btn register-form__submit default-btn_1 disabled"}
                                aria-disabled="true" role="submit" data-bs-toggle="button"
                            >Реєстрація</button>
                        </div>
                    </form>

                </div>

            </div>
        </div>
    );
})

export default Register;