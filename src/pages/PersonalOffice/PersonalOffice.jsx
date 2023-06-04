import "./PersonalOffice.scss"
import { Formik, useFormik } from "formik"
import * as Yup from "yup"
import { observer } from "mobx-react-lite"
import React, { useEffect, useState } from 'react'
import PersonalOfficeStore from "../../store/PersonalOfficeStore"
import serverStore from "../../store/serverStore"
import OneOrder from "../../components/OneOrder/OneOrder"
import { useTranslation } from 'react-i18next';
import { toJS } from "mobx"
import axios from "axios"

const PersonalOffice = observer(() => {


  const [oldEye, setOldEye] = useState(false)
  const [newEye, setNewEye] = useState(false)
  const [postErrors, setSetPostErrors] = useState({ UA: "", EN: "" })
  const [orderArray, setorderArray] = useState([])
  const { t } = useTranslation();

  useEffect(() => {
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
          console.log(response);
          alert("Response")
          setSetPostErrors({ UA: "", EN: "" })
          localStorage.setItem("IsAuthMOTO", "")
          window.location.href = "/login"
        })
        .catch((errors) => {
          console.log(errors.response.data);
          setSetPostErrors(errors.response.data)
        })

    }
  })
  // Formik
  function deleteUser(){
    axios.post("https://moto-server.onrender.com/api/deleteUser",{id:serverStore.UserData.user.id})
    .then((response)=>{
      localStorage.removeItem("IsAuthMOTO")
      serverStore.userIsAuth = false
      window.location.href = "/login"
    })
    .catch((error)=>{
      console.log(error);
    })
  }

  return (
    <div className="PresonalOffice_container | row m-0">


      {/* <input type="text" name="password" id="password" className="" placeholder={t('login.password-placeholder')}/> */}



      <div className="col border-end border-2 border-dark pb-3">
        <div className="| fs-5">Привіт , <span className="fs-italic">{serverStore.UserName}</span></div>
        <div className="pt-3 pb-1 fs-4 text-center">Замовлення</div>
        <div>
          {/* Замовлення */}
          {
            orderArray.length >= 1
              ?
              orderArray.map((data) => {
                return <OneOrder data={data} key={data._id}></OneOrder>
              })
              : <div className="text-center fs-4 mt-3">Замвлень немає..</div>
          }
          {/* Замовлення */}
        </div>
      </div>
      <form onSubmit={formik.handleSubmit} className={"col-7 " + PersonalOfficeStore.test}>
        <div className="pt-3 fs-4 text-center ">Налаштунки особистого кабінету</div>
        <div className="row m-0 pt-4">
          <div className="col">
            <input id="email" name="email" type="text" className="form-control forms_bot_line login-form__password" placeholder="Ваш Email"
              value={formik.values.email}
              onChange={() => false}
            />
            <span className="validError">{formik.errors.email}</span>
          </div>
          <div className="col">
            <input type="text" id="name" name="name" className="form-control forms_bot_line login-form__password" placeholder="Змінити Ім'я"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
            />
            <span className="validError">{formik.errors.name}</span>

          </div>
        </div>
        <div className="text-center fs-3 pt-5 pb-3">Змінити пароль</div>
        <div className="row m-0 pt-4">
          <div className="col">
            <div className="d-flex align-items-center position-relative">
              <input type={oldEye ? "text" : "password"} id="oldPass" name="oldPass" className="form-control forms_bot_line login-form__password" placeholder="Старий пароль"
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
          <div className="col">
            <div className="d-flex align-items-center position-relative">
              <input type={newEye ? "text" : "password"} id="newPass" name="newPass" className="form-control forms_bot_line login-form__password" placeholder="Новий пароль"
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
          <button type="submit" className="btn mainButton mt-5 p-3" >Змінити данні</button>
          <button type="button" className="btn mainButton mt-5 p-3 ms-3" onClick={deleteUser}>Видалити акаунт</button>
        </div>
      </form>
    </div>
  )
})

export default PersonalOffice