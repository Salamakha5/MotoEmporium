import './Register.scss';
import moto_bg from '../../images/logReg_bg.png';
import language_img from '../../images/icons/choice_flag-en.png';
import Login from '../Login/Login'
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom'
import { useState } from 'react';
import serverStore from '../../store/serverStore.js';
import { observer } from 'mobx-react-lite';
import { useFormik } from "formik";
import * as Yup from "yup"


const Register = observer(() => {
    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: '',
        },
        onSubmit: function (value) {
            alert("Submit!")
            console.log(formik);
        },
        validationSchema: Yup.object({
            name: Yup.string().required("Не заповнене").min(4, "Поле має містити мін. 4 символа!").label("error name"),
            email: Yup.string().required("Не заповнене").email("Eлектронна адреса має бути дійсною!"),
            password: Yup.string().required("Не заповнене").min(3, "Пароль має містити від 3 сим."),
        })

    })
    const [iconsLock1, setIconsLock1] = useState("bi bi-eye-fill")
    function requestToStore() {
        const { email, name, password } = formik.values
        serverStore.registerUser(name, email, password)
    }
    function changeIconsClass(e) {
        if (e.target.id == "button1") { iconsLock1 == "bi bi-eye-slash-fill" ? setIconsLock1("bi bi-eye-fill") : setIconsLock1("bi bi-eye-slash-fill") }
    }
    return (
        <div className="register">
            <div className="register__img-title">MotoEmporium</div>
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
                    <div className="register-form__title">Створити новий обліковий запис</div>
                    <div className="register-form__suptitle">Вже є аккаунт?
                        <NavLink to='/login' element={<Login />}>
                            <span className="main-link"> Авторизація </span>
                        </NavLink>
                        тут</div>
                    <form onSubmit={formik.handleSubmit}>

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
                            <input type={iconsLock1 == "bi bi-eye-fill" ? "password" : "text"} name="password" id="password" className="form-control forms_bot_line register-form__password" placeholder="Пароль"
                                onChange={formik.handleChange}
                                value={formik.values.password}
                            />
                            <label className='error'>{formik.errors.password ? formik.errors.password : ""}</label>
                            <button onClick={changeIconsClass} type="button" className="btn-show_password"><i id="button1" className={"fs-3 " + iconsLock1}></i></button>
                        </div>
                        <div className="iAgree-wrap">
                            <input className="form-check-input" type="checkbox" id="iAgree" />
                            <label className="form-check-label" htmlFor="iAgree">Я погоджуюсь на умови зберігання</label>
                        </div>
                        <div className='ErrorApi'>{serverStore.registerError}</div>
                        <div className="btn-cont">
                            <button onClick={requestToStore} className={formik.isValid && formik.dirty ? "btn default-btn_1 register-form__submit" : "btn register-form__submit disabled default-btn_1"} aria-disabled="true" role="submit" data-bs-toggle="button">Реєстрація</button>
                        </div>
                    </form>

                </div>

            </div>
        </div>
    );
})

export default Register;