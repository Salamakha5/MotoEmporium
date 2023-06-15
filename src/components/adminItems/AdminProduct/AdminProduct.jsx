import './AdminProduct.scss'

import clientStore from "../../../store/clientStore";
import serverStore from '../../../store/serverStore'

import { useState } from 'react'
import { NavLink, useNavigate } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { useTranslation } from 'react-i18next';
import alertify from 'alertifyjs'
import { useFormik } from "formik";
import * as Yup from "yup"
import { toJS } from 'mobx'
import axios from 'axios';

const AdminProduct = observer((props) => {

  const navigate = useNavigate()
  const { t } = useTranslation();

  const { _id, brand, model, price, imgURL, collectionType, displacement, borexStroke,
    compressionRatio, horsepower, torque, fuelSystem, gearbox, __v } = toJS(props.data);
  const [btnOpen, setbtnOpen] = useState(false)
  const [editIsActive, seteditIsActive] = useState(false)
  const [currentImg, setCurrentImg] = useState(0)
  // const [ShowPageLoader, setShowPageLoader] = useState(true)

  const editFormik = useFormik({
    initialValues: {
      newBrand: brand,
      newModel: model,
      newPrice: price,
      newImgUrl1: toJS(imgURL[0]),
      newImgUrl2: toJS(imgURL[1]),
      newImgUrl3: toJS(imgURL[2]),
      newType: collectionType,
      newDisplacement: displacement,
      newBorexStroke: borexStroke,
      newCompressionRatio: compressionRatio,
      newHorsepower: horsepower,
      newTorque: torque,
      newFuelSystem: fuelSystem,
      newGearbox: gearbox
    },
    validationSchema: Yup.object({
      newBrand: Yup.string().min(5, t('yupErrors.valid-field', { num: 5 })).max(50, t('yupErrors.valid-maxLength', { num: 50 })),
      newModel: Yup.string().min(5, t('yupErrors.valid-field', { num: 5 })).max(50, t('yupErrors.valid-maxLength', { num: 50 })),
      newPrice: Yup.string().min(3, t('yupErrors.valid-field', { num: 3 })).max(50, t('yupErrors.valid-maxLength', { num: 50 })),
      newImgUrl1: Yup.string().min(5, t('yupErrors.valid-field', { num: 5 })).max(1000, t('yupErrors.valid-maxLength', { num: 1000 })),
      newImgUrl2: Yup.string().min(5, t('yupErrors.valid-field', { num: 5 })).max(1000, t('yupErrors.valid-maxLength', { num: 1000 })),
      newImgUrl3: Yup.string().min(5, t('yupErrors.valid-field', { num: 5 })).max(1000, t('yupErrors.valid-maxLength', { num: 1000 })),
      newType: Yup.string().min(5, t('yupErrors.valid-field', { num: 5 })).max(50, t('yupErrors.valid-maxLength', { num: 50 })),
      newDisplacement: Yup.string().min(5, t('yupErrors.valid-field', { num: 5 })).max(50, t('yupErrors.valid-maxLength', { num: 50 })),
      newBorexStroke: Yup.string().min(5, t('yupErrors.valid-field', { num: 5 })).max(50, t('yupErrors.valid-maxLength', { num: 50 })),
      newCompressionRatio: Yup.string().min(3, t('yupErrors.valid-field', { num: 3 })).max(50, t('yupErrors.valid-maxLength', { num: 50 })),
      newHorsepower: Yup.string().min(5, t('yupErrors.valid-field', { num: 5 })).max(50, t('yupErrors.valid-maxLength', { num: 50 })),
      newTorque: Yup.string().min(5, t('yupErrors.valid-field', { num: 5 })).max(50, t('yupErrors.valid-maxLength', { num: 50 })),
      newFuelSystem: Yup.string().min(5, t('yupErrors.valid-field', { num: 5 })).max(200, t('yupErrors.valid-maxLength', { num: 200 })),
      newGearbox: Yup.string().min(5, t('yupErrors.valid-field', { num: 5 })).max(200, t('yupErrors.valid-maxLength', { num: 200 })),
    })
  })
  let eF = editFormik

  function oneField(title, displayData, nWidth, nType, nPlaceholder, name, initialValObject, errorsObject) {

    return (
      <div className={editIsActive ? 'item ifEditActive' : 'item'} ><div>{title}: <span className='data-span'>{displayData}</span></div>
        {editIsActive ? <>
          <i className="bi bi-arrow-right mx-3"></i>
          <input style={{ width: nWidth }} type={nType} placeholder={nPlaceholder} className='form-control'
            name={name} onChange={eF.handleChange} value={initialValObject}></input>

          <div className='error-string'>{errorsObject ? errorsObject : ""}</div>
        </> : false
        }
      </div >
    )
  }

  function sureDelete() {


    alertify.confirm(t('admin_page.sureDelete.title'), t('admin_page.sureDelete.text-product'),
      function () {
        props.productsSmallLoader(true)

        axios.post(`${serverStore.URL}/deleteMoto`, {
    email: serverStore.UserData.user.email,
          id: _id
        })
          .then(function (response) {
            let motoStorage = JSON.parse(localStorage.getItem("BasketMoto"))
            motoStorage = motoStorage.filter(motoObj => motoObj.id !== _id)
            localStorage.setItem("BasketMoto", JSON.stringify(motoStorage))
        
            let motoFav = JSON.parse(localStorage.getItem("FavoriteMoto"))
            motoFav = motoFav.filter(motoObj => motoObj !== _id)
            localStorage.setItem("FavoriteMoto", JSON.stringify(motoFav))
            
            alertify.success(response.data.massage.en)

            serverStore.getAllMoto(() => { })
            props.productsSmallLoader(false)
          })
          .catch(function (error) {
            alertify.error('error')
            props.productsSmallLoader(false)
          });
      },
      function () { });
  }

  function saveChanges() {

    let { newBrand, newModel, newPrice, newImgUrl1, newImgUrl2, newImgUrl3, newType, newDisplacement,
      newBorexStroke, newCompressionRatio, newHorsepower, newTorque, newFuelSystem, newGearbox } = eF.values

    function rowBuilder(order, title, boldSpan, type, fieldVal, isNeedBr) {
      // console.log(type);
      return (`${order}.${title}: <span ${boldSpan ? 'class="fw-bold"' : false}>
            ${type == 'string' ? (fieldVal.length == 0 ? fieldVal = t('admin_page.noChages') : fieldVal)
          :
          (type == 'price' ? (fieldVal <= 0) ? clientStore.formatPrice(fieldVal) : clientStore.formatPrice(fieldVal)
            :
            fieldVal = 'TYPE ERROR')}</span> 
            ${isNeedBr ? "</br>" : false}`)
    }

    function checkNewData(formVal, defaultVal, type) {
      if (type == 'string') { return formVal.length == 0 ? formVal = defaultVal : formVal; }
      if (type == 'price') { return formVal <= 0 ? formVal = defaultVal : formVal; }
    }

    if (eF.isValid) {

      alertify.confirm(t('admin_page.saveAlert.title'), `
            ${rowBuilder('1', t('moto_data.brand'), true, "string", newBrand, brand, true)}
            ${rowBuilder('2', t('moto_data.model'), true, "string", newModel, model, true)}
            ${rowBuilder('3', t('moto_data.price'), true, "price", newPrice, price, true)}
            4.${t('moto_data.image', { imgNum: '' })}: 
            <br>
            <img style='width: 32%; height: 150px;' src='${newImgUrl1 == 0 ? newImgUrl1 = imgURL[0] : newImgUrl1}' alt="img 1 wrong" />
            <img style='width: 32%; height: 150px;' src='${newImgUrl2 == 0 ? newImgUrl2 = imgURL[1] : newImgUrl2}' alt="img 2 wrong" />
            <img style='width: 32%; height: 150px;' src='${newImgUrl3 == 0 ? newImgUrl3 = imgURL[2] : newImgUrl3}' alt="img 3 wrong" />
            <br>
            ${rowBuilder('5', t('moto_data.type'), true, "string", newType, collectionType, true)}
            ${rowBuilder('6', t('moto_data.engineCapacity'), true, "string", newDisplacement, displacement, true)}
            ${rowBuilder('7', t('moto_data.pistonDiameter'), true, "string", newBorexStroke, borexStroke, true)}
            ${rowBuilder('8', t('moto_data.compressionRatio'), true, "string", newCompressionRatio, compressionRatio, true)}
            ${rowBuilder('9', t('moto_data.horsePower'), true, "string", newHorsepower, horsepower, true)}
            ${rowBuilder('10', t('moto_data.torque'), true, "string", newTorque, torque, true)}
            ${rowBuilder('11', t('moto_data.fuelSystem'), true, "string", newFuelSystem, fuelSystem, true)}
            ${rowBuilder('12', t('moto_data.gearbox'), true, "string", newGearbox, gearbox, true)}
            <hr/>
            ${t('admin_page.saveAlert.suptext')}
            `,
        function () {

          props.productsSmallLoader(true)

          axios.patch(`${serverStore.URL}/changeMoto`, {
            email: serverStore.UserData.user.email,
            moto: {
              id: _id,
              brand: checkNewData(newBrand, brand, 'string'),
              model: checkNewData(newModel, model, 'string'),
              price: checkNewData(newPrice, price, 'price'),
              imgURL: [
                checkNewData(newImgUrl1, imgURL[0], 'string'),
                checkNewData(newImgUrl2, imgURL[1], 'string'),
                checkNewData(newImgUrl3, imgURL[2], 'string')
              ],
              collectionType: checkNewData(newType, collectionType, 'string'),
              displacement: checkNewData(newDisplacement, displacement, 'string'),
              borexStroke: checkNewData(newBorexStroke, borexStroke, 'string'),
              compressionRatio: checkNewData(newType, collectionType, 'string'),
              horsepower: checkNewData(newHorsepower, horsepower, 'string'),
              torque: checkNewData(newTorque, torque, 'string'),
              fuelSystem: checkNewData(newFuelSystem, fuelSystem, 'string'),
              gearbox: checkNewData(newGearbox, gearbox, 'string')
            }
          })
            .then(function (response) {
              // console.log(response);
              alertify.success('succes')
              serverStore.getAllMoto(() => { })
              props.productsSmallLoader(false)
            })
            .catch(function (error) {
              // console.log(error);
              alertify.error('error')
              props.productsSmallLoader(false)
            });

        },
        function () { });
    }

  }

  return (
    <div className='admProduct | row'>

      {
        btnOpen ?
          <>
            <div className="img-cont | col-12 col-md-12 col-lg-12 col-xl-4">
              <img className='col-12' src={imgURL[currentImg]} alt="Product img" />
              <div className='mini-images-cont'>
                <div className="miniImgCont" onClick={() => setCurrentImg(0)} data-hover-text={t('oneMoto_page.img-data-text-choose')}>
                  <img src={imgURL[0]} />
                </div>
                <div className="miniImgCont" onClick={() => setCurrentImg(1)} data-hover-text={t('oneMoto_page.img-data-text-choose')}>
                  <img src={imgURL[1]} />
                </div>
                <div className="miniImgCont" onClick={() => setCurrentImg(2)} data-hover-text={t('oneMoto_page.img-data-text-choose')}>
                  <img src={imgURL[2]} />
                </div>
              </div>
              {editIsActive ? <>
                <div className={editIsActive ? 'item ifEditActive' : 'item'} >
                  <div> {t('moto_data.image', { imgNum: currentImg + 1 })}</div>
                  {editIsActive ? <>
                    {/* 1 */}
                    <input style={currentImg == 0 ? { width: "100%", display: 'block' } : { display: 'none' }}
                      type='text' placeholder='new img 1' className='form-control img-active1 mb-3'
                      name="newImgUrl1" onChange={eF.handleChange} value={eF.values.newImgUrl1}></input>
                    {/* 2 */}
                    <input style={currentImg == 1 ? { width: "100%", display: 'block' } : { display: 'none' }}
                      type='text' placeholder='new img 2' className='form-control img-active2 mb-3'
                      name="newImgUrl2" onChange={eF.handleChange} value={eF.values.newImgUrl2}></input>
                    {/* 3 */}
                    <input style={currentImg == 2 ? { width: "100%", display: 'block' } : { display: 'none' }}
                      type='text' placeholder='new img 3' className='form-control img-active3 mb-3'
                      name="newImgUrl3" onChange={eF.handleChange} value={eF.values.newImgUrl3}></input>

                    <div className='error-string'>{eF.errors.newImgUrl1 ? '1' + ' ' + eF.errors.newImgUrl1 : ""}</div>
                    <div className='error-string'>{eF.errors.newImgUrl2 ? '2' + ' ' + eF.errors.newImgUrl2 : ""}</div>
                    <div className='error-string'>{eF.errors.newImgUrl3 ? '3' + ' ' + eF.errors.newImgUrl3 : ""}</div>
                  </> : false
                  }
                </div >
              </> : false}
            </div>
            <div className="info-cont | col-12 col-md-8 col-lg-8 col-xl-6">
              <div className="item">{t('admin_page.products_tab.idProduct')}: <span className='italic-text data-span'>{_id}</span></div>
              <div className='item'>{t('admin_page.products_tab.prodChanges')}: <span className='data-span'>{__v}</span></div>
              <hr />
              <form className='editform'>
                {oneField(t('moto_data.brand'), brand, "300px", "text", "new brand", "newBrand", eF.values.newBrand, eF.errors.newBrand)}
                {oneField(t('moto_data.model'), model, "300px", "text", "new model", "newModel", eF.values.newModel, eF.errors.newModel)}
                {oneField(t('moto_data.price'), clientStore.formatPrice(price), "300px", "Number", "new price", "newPrice", eF.values.newPrice, eF.errors.newPrice)}
                {oneField(t('moto_data.type'), collectionType, "300px", "text", "new type", "newType", eF.values.newType, eF.errors.newType)}
                {oneField(t('moto_data.engineCapacity'), displacement, "300px", "text", "new displacement", "newDisplacement", eF.values.newDisplacement, eF.errors.newDisplacement)}
                {oneField(t('moto_data.pistonDiameter'), borexStroke, "300px", "text", "new borex stroke", "newBorexStroke", eF.values.newBorexStroke, eF.errors.newBorexStroke)}
                {oneField(t('moto_data.compressionRatio'), compressionRatio, "300px", "text", "new compression ratio", "newCompressionRatio", eF.values.newCompressionRatio, eF.errors.newCompressionRatio)}
                {oneField(t('moto_data.horsePower'), horsepower, "300px", "text", "new horsepower", "newHorsepower", eF.values.newHorsepower, eF.errors.newHorsepower)}
                {oneField(t('moto_data.torque'), torque, "300px", "text", "new torque", "newTorque", eF.values.newTorque, eF.errors.newTorque)}
                <div className={editIsActive ? 'item ifEditActive textarea-items' : 'item textarea-items'}><div>{t('moto_data.fuelSystem')}: <span className='data-span'>{fuelSystem}</span></div>
                  {editIsActive ? <>
                    <i className="bi bi-arrow-right mx-3"></i>
                    <textarea className='form-control' placeholder='new fuel system'
                      name="newFuelSystem" onChange={eF.handleChange} value={eF.values.newFuelSystem}></textarea>
                    <div className='error-string'>{eF.errors.newFuelSystem ? eF.errors.newFuelSystem : ""}</div>
                  </> : false}
                </div>
                <div className={editIsActive ? 'item ifEditActive textarea-items' : 'item textarea-items'}><div>{t('moto_data.gearbox')}: <span className='data-span'>{gearbox}</span></div>
                  {editIsActive ? <>
                    <i className="bi bi-arrow-right mx-3"></i>
                    <textarea className='form-control' placeholder='new gearbox'
                      name="newGearbox" onChange={eF.handleChange} value={eF.values.newGearbox}></textarea>
                    <div className='error-string'>{eF.errors.newGearbox ? eF.errors.newGearbox : ""}</div>
                  </> : false}
                </div>
              </form>
            </div>
            <div className='d-flex align-items-end justify-content-end col-12 col-md-4 col-lg-4 col-xl-2'>
              <div className="buttons-cont">
                <button className="mainButton delete | btn px-4 py-2" onClick={sureDelete}>{t('admin_page.btn-delete')}</button>

                <button onClick={() => seteditIsActive(!editIsActive)} className="mainButton edit | btn px-4 py-2">{t('admin_page.btn-edit')}</button>

                {editIsActive ? <button onClick={saveChanges}
                  className={eF.isValid && eF.dirty ? "mainButton save | btn px-4 py-2" : '"mainButton save btn disabled | btn px-4 py-2"'}>{t('admin_page.btn-save')}</button> : false}

                <button className='mainButton btn-readFull' onClick={() => setbtnOpen(!btnOpen)}>{btnOpen ? t('admin_page.btn-readFull_hide') : t('admin_page.btn-readFull_expand')}</button>
              </div>
            </div>
          </>
          :
          <>
            <div className="img-cont | col-12 col-md-12 col-lg-4 col-xl-3">
              <img style={{ height: "200px" }} src={imgURL[0]} alt="Product img" />
            </div>
            <div className="info-cont | col-12 col-sm-6 col-md-6 col-lg-6 col-xl-7">
              <div className="item id">{t('admin_page.products_tab.idProduct')}: <span className='italic-text data-span'>{_id}</span></div>
              <div className='item'>{t('admin_page.products_tab.prodChanges')}: <span className='data-span'>{__v}</span></div>
              <hr />
              <div className='item'>{t('moto_data.brand')}: <span className='data-span'>{brand}</span></div>
              <div className='item'>{t('moto_data.model')}: <span className='data-span'>{model}</span></div>
              <div className='item'>{t('moto_data.price')}: <span className='data-span'>{clientStore.formatPrice(price)}</span></div>
              <div className='item'>{t('moto_data.type')}: <span className='data-span'>{collectionType}</span></div>
            </div>
            <div className='d-flex align-items-end justify-content-end col-12 col-sm-6 col-md-6 col-lg-2 col-xl-2'>
              <div style={{ height: "120px" }} className="buttons-cont">
                <NavLink to={`/moto/?id=${_id}`} className="mainButton view | btn px-4 py-2">{t('admin_page.btn-view')}</NavLink>
                <button className='mainButton btn-readFull' onClick={() => setbtnOpen(!btnOpen)}>{btnOpen ? t('admin_page.btn-readFull_hide') : t('admin_page.btn-readFull_expand')}</button>
              </div>
            </div>
          </>
      }

    </div >
  )
})

export default AdminProduct