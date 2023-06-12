import './AdminNewsItem.scss'

import newsStore from '../../../store/newsStore'
import clientStore from '../../../store/clientStore';

import { useState } from 'react'
import { NavLink, useNavigate } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { useTranslation } from 'react-i18next';
import alertify from 'alertifyjs'
import { useFormik } from "formik";
import * as Yup from "yup"
import { toJS } from 'mobx'

const AdminNewsItem = (props) => {

  const navigate = useNavigate()
  const { t } = useTranslation();
  let { img, text, header, data, status } = props.data
  const [btnOpen, setbtnOpen] = useState(false)
  const [editIsActive, seteditIsActive] = useState(false)

  const editFormik = useFormik({
    initialValues: {
      newImg: img,
      newHeaderEN: header.en,
      newHeaderUA: header.ua,
      newTextEN: text.en,
      newTextUA: text.ua,
      newDate: data,
      newStatus: status
    },
    validationSchema: Yup.object({
      newImg: Yup.string().min(5, t('yupErrors.valid-field', { num: 5 })).max(500, t('yupErrors.valid-maxLength', { num: 500 })),
      newHeaderEN: Yup.string().min(15, t('yupErrors.valid-field', { num: 15 })).max(200, t('yupErrors.valid-maxLength', { num: 200 })),
      newHeaderUA: Yup.string().min(15, t('yupErrors.valid-field', { num: 15 })).max(200, t('yupErrors.valid-maxLength', { num: 200 })),
      newTextEN: Yup.string().min(50, t('yupErrors.valid-field', { num: 50 })).max(800, t('yupErrors.valid-maxLength', { num: 800 })),
      newTextUA: Yup.string().min(50, t('yupErrors.valid-field', { num: 50 })).max(800, t('yupErrors.valid-maxLength', { num: 800 })),
      newDate: Yup.string().min(10, t('yupErrors.valid-field', { num: 10 })).max(10, t('yupErrors.valid-maxLength', { num: 10 })),
      newStatus: Yup.number().min(1, t('yupErrors.valid-noLessThan', { num: 1 })).max(10, t('yupErrors.valid-noMoreThan', { num: 10 })),
    })
  })
  let eF = editFormik

  function oneField(nWidth, nType, nPlaceholder, nName, initialValObject, errorsObject) {

    return (
      <div className={editIsActive ? 'edititem' : 'edititem'} >
        {editIsActive ? <>
          <input style={{ width: nWidth }} type={nType} placeholder={nPlaceholder} className='form-control'
            name={nName} onChange={eF.handleChange} value={initialValObject}></input>

          <div className='error-string'>{errorsObject ? errorsObject : ""}</div>
        </> : false
        }
      </div >
    )
  }

  function sureDelete() {
    alertify.confirm(t('admin_page.sureDelete.title'), t('admin_page.sureDelete.text-news'),
      function () { alertify.success(t('admin_page.sureDelete.succes')) },
      function () { alertify.error(t('admin_page.sureDelete.error')) });
  }

  function saveChanges() {
    let { newHeaderEN, newHeaderUA, newTextEN, newTextUA, newDate, newStatus, newImg } = eF.values

    function rowBuilder(order, title, boldSpan, type, fieldVal, defaultVal, isNeedBr) {
      console.log(type);
      return (`${order}.${title}: <span ${boldSpan ? "className='fw-bold'" : false}>
      ${type == 'string' ? (fieldVal.length == 0 ? fieldVal = 'Без змін' : fieldVal)
          :
          (type == 'number' ? fieldVal <= 0 ? fieldVal = clientStore.formatPrice(defaultVal) : clientStore.formatPrice(fieldVal)
            :
            fieldVal = 'TYPE ERROR')}</span> 
      ${isNeedBr ? "</br>" : false}`)
    }

    if (eF.isValid) {

      alertify.confirm('Підтвердити зміни?', `
      ${rowBuilder('1', 'Заголовок (EN)', true, "string", newHeaderEN, header.en, true)}
      ${rowBuilder('2', 'Заголовок (UA)', true, "string", newHeaderUA, header.ua, true)}
      <hr/>
      ${rowBuilder('3', 'Дата', true, "string", newDate, data, true)}
      ${rowBuilder('4', 'Рейтинг', true, "string", newStatus, status, true)}
      5.Картинка:
      <img style='width: 100%; max-height: 200px;' src='${newImg.length == 0 ? newImg = img : newImg}' alt="somethig wrong" />
      <hr/>
      ${rowBuilder('6', 'Текст (EN)', true, "string", newTextEN, text.en, true)}
      ${rowBuilder('7', 'Текст (UA)', true, "string", newTextUA, text.ua, true)}
      <hr/>
      ! - Ви можете залишити поле пустим щоб залишити данні без змін - !
      `,
        function () {

          // То по ідеї оновить данні в нашій таблиці
          // newsStore.getAllNews(() => {})

          // Якщо getAllNews не спрацює тоді це перезагрузить сторінку
          // navigate(0)

          alertify.success('Зміни збережено!')
        },
        function () { });
    }
  }

  return (
    <div className='adminBlogItem border-bottom border-1 border-dark'>
      <div className="row">
        {
          btnOpen
            ?
            <>
              <div className="col-img | col-12 col-sm-12 col-md-4 col-lg-4 col-xl-4 d-flex align-items-center justify-content-center">
                <img src={img} alt="blog picture" />
                <div style={{ width: "100%" }}>{editIsActive ? oneField("100%", "text", "new img", "newImg", eF.values.newImg, eF.errors.newImg) : null}</div>
              </div>
            </>
            :
            <div className="col-img | col-12 col-sm-12 col-md-3 col-lg-3 col-xl-3 d-flex align-items-center justify-content-center">
              <img src={img} alt="blog picture" />
            </div>
        }
        <div className="col ">
          <div className="textInfo row m-0">
            {
              btnOpen
                ?
                <>
                  <div className='col-12 col-sm-12 col-md-12 col-lg-9 col-xl-9 ps-0'>
                    <div className="blogTitle | text-start">EN: {header.en}
                      {editIsActive ? oneField("100%", "text", "new EN header", "newHeaderEN", eF.values.newHeaderEN, eF.errors.newHeaderEN) : null}
                    </div>
                    <div className="blogTitle | text-start pb-2">UA: {header.ua}
                      {editIsActive ? oneField("100%", "text", "new UA header", "newHeaderUA", eF.values.newHeaderUA, eF.errors.newHeaderUA) : null}
                    </div>
                  </div>
                  <div className="textInfo__text | text-end mb-1 fw-bold fs-4 col-12 col-sm-12 col-md-12 col-lg-3 col-xl-3">
                    <div>

                      {/* date */}
                      {data}
                      {editIsActive ? <div className='mb-4'>
                        <div className='d-flex justify-content-end flex-direction-column'>
                          <input style={{ width: '150px' }} type='text' placeholder='new date' className='form-control'
                            name='newDate' onChange={eF.handleChange} value={eF.values.newDate}></input>
                        </div>
                        <span className='error-string'>{eF.errors.newDate ? eF.errors.newDate : null}</span>
                      </div> : null}
                    </div>

                    {/* status */}
                    <div>{clientStore.currentLang == "ua" ? "Рейтинг" : "Rating"}: {status}
                      {editIsActive ? <div className='mb-4'>
                        <div className='d-flex justify-content-end flex-direction-column'>
                          <input style={{ width: '70px' }} type='text' placeholder='new date' className='form-control'
                            name='newStatus' onChange={eF.handleChange} value={eF.values.newStatus}></input>
                        </div>
                        <span className='error-string'>{eF.errors.newStatus ? eF.errors.newStatus : null}</span>
                      </div> : null}
                    </div>

                  </div>
                </>
                :
                <>
                  <div className="blogTitle | col-8 text-start">{clientStore.currentLang == "ua" ? header.ua : header.en}</div>
                  <div className="textInfo__text col-4 text-end mb-1">
                    <div>{data}</div>
                    <div>{clientStore.currentLang == "ua" ? "Рейтинг" : "Rating"}: {status}</div>
                  </div>
                </>
            }
          </div>
          <div>
            {
              btnOpen
                ?
                <>
                  {
                    editIsActive ?
                      <>
                        <p className='news_fullText'><span className='fw-bold fs-4'>EN:</span> {text.en}</p>

                        <textarea style={{ maxHeight: '500px' }} placeholder='new EN text' className='form-control mt-2 mb-4'
                          name="newTextEN" onChange={eF.handleChange} value={eF.values.newTextEN}></textarea>
                        <div className='error-string'>{eF.errors.newTextEN ? eF.errors.newTextEN : null}</div>
                      </>
                      :
                      <>
                        <p className='news_fullText'><span className='fw-bold fs-4'>EN:</span> {text.en}</p>
                        <hr />
                      </>
                  }
                  {
                    editIsActive ?
                      <>
                        <p className='news_fullText'><span className='fw-bold fs-4'>UA:</span> {text.ua}</p>

                        <textarea style={{ maxHeight: '500px' }} placeholder='new UA text' className='form-control mt-2'
                          name="newTextUA" onChange={eF.handleChange} value={eF.values.newTextUA}></textarea>
                        <div className='error-string'>{eF.errors.newTextUA ? eF.errors.newTextUA : null}</div>
                      </>
                      :
                      <p className='news_fullText'><span className='fw-bold fs-4'>UA:</span> {text.ua}</p>
                  }
                </>
                :
                <p className='news_trimText'>{clientStore.currentLang == "ua" ? text.ua.substring(0, 300) : text.en.substring(0, 300)}...</p>
            }
          </div>
          <div className='buttons-cont pt-5 pb-4'>
            {
              btnOpen ?
                <div className={editIsActive ? "buttons-wrap col-12 col-sm-12 col-md-12 col-lg-12 col-xl-9 col-xxl-9"
                  : "buttons-wrap col-12 col-sm-12 col-md-12 col-lg-12 col-xl-7 col-xxl-7"}>
                  <button className="mainButton delete | btn px-4 py-2" onClick={sureDelete}>
                    {t('admin_page.btn-delete')}</button>

                  <button onClick={() => seteditIsActive(!editIsActive)} className="mainButton edit | btn px-4 py-2">
                    {t('admin_page.btn-edit')}</button>

                  {editIsActive ? <button onClick={saveChanges}
                    className={eF.isValid && eF.dirty ? "mainButton save | btn px-4 py-2" : "mainButton save btn disabled | btn px-4 py-2"}>
                    {t('admin_page.btn-save')}</button> : false}

                  <button className='mainButton btn-readFull' onClick={() => setbtnOpen(!btnOpen)}>
                    {btnOpen ? t('admin_page.btn-readFull_hide') : t('admin_page.btn-readFull_expand')}</button>
                </div>
                :
                <div className="buttons-wrap d-flex justify-content-end col-11">
                  <button button className='mainButton btn-readFull' onClick={() => setbtnOpen(!btnOpen)}>
                    {btnOpen ? t('admin_page.btn-readFull_hide') : t('admin_page.btn-readFull_expand')}</button>
                </div>
            }
          </div>
        </div>
      </div>
    </div >
  )
}

export default AdminNewsItem