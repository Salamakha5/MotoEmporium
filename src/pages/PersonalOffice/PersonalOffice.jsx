import "./PersonalOffice.scss"

import personalOfficeStore from "../../store/PersonalOfficeStore"
import serverStore from "../../store/serverStore"
import OneOrder from "../../components/OneOrder/OneOrder"
import BackUpBtn from '../../components/BackUpBtn/BackUpBtn'

import { useFormik } from "formik"
import * as Yup from "yup"
import { observer } from "mobx-react-lite"
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import axios from "axios"
import alertify from 'alertifyjs'

const PersonalOffice = observer(() => {

    const [oldEye, setOldEye] = useState(false)
    const [newEye, setNewEye] = useState(false)
    const [postErrors, setSetPostErrors] = useState({ UA: "", EN: "" })
    const [orderArray, setorderArray] = useState([])
    const { t } = useTranslation();

    useEffect(() => {
        document.title = 'Personal office | MotoEmporium'

        axios.post("https://moto-server.onrender.com/api/getOrdersToEmail", { email: serverStore.UserData.user.email })
            .then((response) => {
                console.log(response);
                setorderArray(response.data)
            })
            .catch((error) => {
                console.log(error);
            })
    }, [])

    // Formik
    const formik = useFormik({
        initialValues: {
            email: serverStore.UserData.user.email,
            name: "",
            oldPass: "",
            newPass: ""
        },
        validationSchema: Yup.object({
            email: Yup.string().required(t("office_Page.errors.required")).email(t("office_Page.errors.email")),
            name: Yup.string().min(5, t("office_Page.errors.minLen")).max(20, t("office_Page.errors.maxLen")),
            oldPass: Yup.string().min(5, t("office_Page.errors.minLen")).max(20, t("office_Page.errors.maxLen")),
            newPass: Yup.string().min(5, t("office_Page.errors.minLen")).max(20, t("office_Page.errors.maxLen")),
        }),
        onSubmit: function (value) {
            // value - дані з форм 
            axios.post("https://moto-server.onrender.com/api/changeUserSetting", { formValue: value })
                .then((response) => {
                    // console.log(response);
                    alertify.alert("Успіх", 'Зміна данних пройшла успішно.')
                    setSetPostErrors({ UA: "", EN: "" })
                    localStorage.setItem("IsAuthMOTO", "")
                    window.location.href = "/login"
                })
                .catch((errors) => {
                    // console.log(errors.response.data);
                    setSetPostErrors(errors.response.data)
                })

        }
    })
    // Formik
    function deleteUser() {
        axios.post("https://moto-server.onrender.com/api/deleteUser", { id: serverStore.UserData.user.id })
            .then((response) => {
                localStorage.removeItem("IsAuthMOTO")
                serverStore.userIsAuth = false
                window.location.href = "/login"
            })
            .catch((error) => {
                console.log(error);
            })
    }

    function sureWantDeleteAccount() {
        alertify.confirm('Попередження', `Ви впевнені що хочете видалити аккаунт?
        <br/> <br/> Це незворотня дія, без аккаунту ви не зможете повноцінно користуватись нашими послугами!
        <hr/> Замовлення які ви оформили видалені не будуть, наші менеджери зв'яжуться із вами найближчим часом.`,
            function () {
                alertify.error('Ви видалили свій аккаунт!')
                deleteUser()
            },
            function () { alertify.success('Видалення скасовано') });
    }

    return (
        <div className="PresonalOffice_container | row m-0">
            <BackUpBtn whenShow='750' debugLine='false'></BackUpBtn>

            {/* <input type="text" name="password" id="password" className="" placeholder={t('login.password-placeholder')}/> */}
            <div className="col_border || col-12 col-lg-5 pb-3">
                <div className="fs-5">{t("office_Page.Hello")}, <span className="fs-italic">{serverStore.UserName}</span></div>
                <div className="pt-3 pb-1 fs-4 text-center">{t("office_Page.RecentOrders")}</div>
                <div>
                    {/* Замовлення */}
                    {
                        orderArray.length >= 1
                            ?
                            orderArray.map((data) => {
                                return <OneOrder data={data} key={data._id}></OneOrder>
                            })
                            : <div className="text-center fs-4 mt-3">{t("office_Page.noOrders")}</div>
                    }
                    {/* Замовлення */}
                </div>
            </div>
            <form onSubmit={formik.handleSubmit} className={"col-12 col-lg-7 " + personalOfficeStore.test}>
                <div className="pt-3 fs-4 text-center ">{t("office_Page.SettingOffice")}</div>
                <div className="row m-0 pt-4">
                    <div className="col-12 col-md-6 pb-4">
                        <input id="email" name="email" type="text" className="form-control forms_bot_line login-form__password"
                            value={formik.values.email}
                            onChange={() => false}
                        />
                        <span className="validError">{formik.errors.email}</span>
                    </div>
                    <div className="col-12 col-md-6 pb-4">
                        <input type="text" id="name" name="name" className="form-control forms_bot_line login-form__password" placeholder={t("office_Page.ChangeName")}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.name}
                        />
                        <span className="validError">{formik.errors.name}</span>

                    </div>
                </div>
                <div className="text-center fs-3 pt-2 pb-3">{t("office_Page.ChangePassword")}</div>
                <div className="row m-0 pt-4 w-100">
                    <div className="col-12 col-md-6 pb-4">
                        <div className="d-flex align-items-center position-relative">
                            <input type={oldEye ? "text" : "password"} id="oldPass" name="oldPass" className="form-control forms_bot_line login-form__password" placeholder={t("office_Page.OldPass")}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.oldPass}
                            />
                            <i className={`pointer | bi ${oldEye ? "bi-eye-fill" : "bi-eye-slash-fill"} ms-1 fs-2 `}
                                onClick={() => setOldEye(!oldEye)}
                            ></i>
                        </div>
                        <span className="validError">{formik.errors.oldPass}</span>
                    </div>
                    <div className="col-12 col-md-6 pb-4">
                        <div className="d-flex align-items-center position-relative">
                            <input type={newEye ? "text" : "password"} id="newPass" name="newPass" className="form-control forms_bot_line login-form__password" placeholder={t("office_Page.NewPass")}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.newPass}
                            />
                            <i className={`pointer | bi ${newEye ? "bi-eye-fill" : "bi-eye-slash-fill"} ms-1 fs-2 `}
                                onClick={() => setNewEye(!newEye)}
                            ></i>
                        </div>
                        <span className="validError">{formik.errors.newPass}</span>
                    </div>
                </div>

                <div className="postError | mt-2 text-center ">
                    {
                        localStorage.getItem("i18nextLng") == "ua"
                            ?
                            postErrors.UA
                            :
                            postErrors.EN
                    }
                </div>


                <div className="d-flex justify-content-center align-items-center">
                    <button type="submit" className="btn mainButton mt-5 p-3" >{t("office_Page.ChangeBtn")}</button>
                    <button type="button" className="btn mainButton mt-5 p-3 ms-3" onClick={sureWantDeleteAccount}>{t("office_Page.DeleteUser")}</button>
                </div>
            </form>
        </div>
    )
})

export default PersonalOffice