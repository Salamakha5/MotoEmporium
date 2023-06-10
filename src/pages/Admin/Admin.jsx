import './Admin.scss'

import BackUpBtn from '../../components/BackUpBtn/BackUpBtn'
import AdminProduct from '../../components/adminItems/AdminProduct/AdminProduct'
import AdminProductsPagination from '../../components/Pagination/AdminProductsPagination'
import serverStore from '../../store/serverStore'
import adminStore from '../../store/adminStore'

import { useNavigate } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import { useTranslation } from 'react-i18next'
import { useEffect, useState, createRef } from 'react'
import { toJS } from 'mobx'
import alertify from 'alertifyjs'
import { useFormik } from "formik";
import * as Yup from "yup"

const Admin = observer(() => {

  const { t, i18n } = useTranslation();
  const navigate = useNavigate()

  const [showProductsLoader, setShowProductsLoader] = useState(true)
  const [showNewsLoader, setShowNewsLoader] = useState(true)

  useEffect(() => {
    document.title = "Admin page | MotoEmporium";

    serverStore.getAllMoto(() => {
      setShowProductsLoader(false)
    })
  }, [])

  // start sort products
  let BrandValue = createRef()
  let ModelValue = createRef()
  let SelectType = createRef()
  let SelectModel = createRef()
  let SortCash = createRef()
  const [ErrorMotoSort, setErrorMotoSort] = useState("")
  function sortCash() {
    switch (SortCash.current.value) {
      case "upper":
        serverStore.MotoDataCopy.sort((a, b) => a.price - b.price)
        break;
      case "lower":
        serverStore.MotoDataCopy.sort((a, b) => b.price - a.price)
        break;
    }
  }
  function getMotoNameToType() {
    let arr = toJS(serverStore.MotoData).filter(moto => moto.collectionType == SelectType.current.value)
    let res = []
    for (let i = 0; i < arr.length; i++) {
      res.push(arr[i].model)
    }
    serverStore.ArrTypeName = res
  }
  function sortData() {
    //Пагінація на першу сторінку
    adminStore.setProductsActivePage(1)

    let SortToBrand = BrandValue.current.value
    let SortToModel = ModelValue.current.value
    let SortSelectCatigories = SelectType.current.value
    let SortSelectModel = SelectModel.current.value

    // Сортування по назві бренду
    serverStore.MotoDataCopy = serverStore.MotoData.filter(moto => moto.brand.includes(SortToBrand))
    if (serverStore.MotoDataCopy == false) {
      setErrorMotoSort(t('shop_page.shop-sortErrors.notHaveBrand'))
    } else { setErrorMotoSort("") }

    // Сортування по назві моделі
    if (SortToModel) {
      serverStore.MotoDataCopy = serverStore.MotoDataCopy.filter(moto => moto.model.includes(SortToModel))
      if (serverStore.MotoDataCopy == false) {
        setErrorMotoSort(t('shop_page.shop-sortErrors.notHaveModel'))
      }
    }

    // Сортування по категоріям
    if (SortSelectCatigories) {
      // console.log("SortSelectCatigories");
      if (SortSelectCatigories == "0") {
        serverStore.MotoDataCopy = serverStore.MotoDataCopy.filter(p => true)
      } else {
        serverStore.MotoDataCopy = serverStore.MotoDataCopy.filter(moto => moto.collectionType == SortSelectCatigories)
        if (serverStore.MotoDataCopy == false) {
          setErrorMotoSort(t('shop_page.shop-sortErrors.notHaveMotoThisType'))
        }
      }
    }

    // Сортування по моделі
    if (SortSelectModel) {
      if (SortSelectCatigories !== "0") {
        // console.log("SortSelectModel");
        if (SortSelectModel == "0") {
          serverStore.MotoDataCopy = serverStore.MotoDataCopy.filter(moto => moto.collectionType == SortSelectCatigories)
        } else {
          serverStore.MotoDataCopy = serverStore.MotoDataCopy.filter(moto => moto.model == SortSelectModel)
          if (serverStore.MotoDataCopy == false) {
            // я скорочував як міг
            setErrorMotoSort(t('shop_page.shop-sortErrors.notHaveMotoThisNameCategory'))
          }
        }
      }
    }


  }
  function ClearSort() {
    serverStore.getAllMoto()
    BrandValue.current.value = ""
    ModelValue.current.value = ""
    SelectType.current.value = "0"
    SelectModel.current.value = "0"
    adminStore.setProductsActivePage(1)
  }
  // end sort products


  // start add product logic
  const addProduct = useFormik({
    initialValues: {
      addBrand: 'Huyati',
      addModel: 'Hueta c300',
      addPrice: 99999,
      addImgUrl1: 'https://images.unsplash.com/photo-1589122350591-964f4987a296?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
      addImgUrl2: 'https://images.unsplash.com/photo-1589122350591-964f4987a296?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
      addImgUrl3: 'https://images.unsplash.com/photo-1589122350591-964f4987a296?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
      addType: 'Sport',
      addDisplacement: '8567 cc',
      addBorexStroke: '450 x 7.85 mm',
      addCompressionRatio: '17.56:07',
      addHorsepower: '109 hp',
      addTorque: '645 lb-ft',
      addFuelSystem: 'Electronic fuel injection, 53 mm throttle bodies',
      addGearbox: '6-speed with Ducati Quick Shift (DQS) up/down'
    },
    validationSchema: Yup.object({
      addBrand: Yup.string().min(5, t('yupErrors.valid-field', { num: 5 })).max(50, t('yupErrors.valid-maxLength', { num: 50 })).required(t('yupErrors.required')),
      addModel: Yup.string().min(5, t('yupErrors.valid-field', { num: 5 })).max(50, t('yupErrors.valid-maxLength', { num: 50 })).required(t('yupErrors.required')),
      addPrice: Yup.string().min(3, t('yupErrors.valid-field', { num: 3 })).max(50, t('yupErrors.valid-maxLength', { num: 50 })).required(t('yupErrors.required')),
      addImgUrl1: Yup.string().min(5, t('yupErrors.valid-field', { num: 5 })).max(200, t('yupErrors.valid-maxLength', { num: 200 })).required(t('yupErrors.required')),
      addImgUrl2: Yup.string().min(5, t('yupErrors.valid-field', { num: 5 })).max(200, t('yupErrors.valid-maxLength', { num: 200 })).required(t('yupErrors.required')),
      addImgUrl3: Yup.string().min(5, t('yupErrors.valid-field', { num: 5 })).max(200, t('yupErrors.valid-maxLength', { num: 200 })).required(t('yupErrors.required')),
      addType: Yup.string().min(5, t('yupErrors.valid-field', { num: 5 })).max(50, t('yupErrors.valid-maxLength', { num: 50 })).required(t('yupErrors.required')),
      addDisplacement: Yup.string().min(5, t('yupErrors.valid-field', { num: 5 })).max(50, t('yupErrors.valid-maxLength', { num: 50 })).required(t('yupErrors.required')),
      addBorexStroke: Yup.string().min(5, t('yupErrors.valid-field', { num: 5 })).max(50, t('yupErrors.valid-maxLength', { num: 50 })).required(t('yupErrors.required')),
      addCompressionRatio: Yup.string().min(3, t('yupErrors.valid-field', { num: 3 })).max(50, t('yupErrors.valid-maxLength', { num: 50 })).required(t('yupErrors.required')),
      addHorsepower: Yup.string().min(5, t('yupErrors.valid-field', { num: 5 })).max(50, t('yupErrors.valid-maxLength', { num: 50 })).required(t('yupErrors.required')),
      addTorque: Yup.string().min(5, t('yupErrors.valid-field', { num: 5 })).max(50, t('yupErrors.valid-maxLength', { num: 50 })).required(t('yupErrors.required')),
      addFuelSystem: Yup.string().min(5, t('yupErrors.valid-field', { num: 5 })).max(200, t('yupErrors.valid-maxLength', { num: 200 })).required(t('yupErrors.required')),
      addGearbox: Yup.string().min(5, t('yupErrors.valid-field', { num: 5 })).max(200, t('yupErrors.valid-maxLength', { num: 200 })).required(t('yupErrors.required')),
    })
  })
  let aF = addProduct

  function oneField(width, type, placeholder, name, initialValObject, errorsObject) {

    return (
      <div className='addFormItem'>
        <input style={{ width: width }} type={type} placeholder={placeholder} className='form-control'
          name={name} onChange={aF.handleChange} value={initialValObject}></input>

        <div className='error-string'>{errorsObject ? errorsObject : ""}</div>
      </div >
    )
  }

  function addNewProduct(e) {
    e.preventDefault()

    let { addBrand, addModel, addPrice, addImgUrl1, addImgUrl2, addImgUrl3, addType, addDisplacement,
      addBorexStroke, addCompressionRatio, addHorsepower, addTorque, addFuelSystem, addGearbox } = aF.values

    if (aF.isValid) {
      alertify.alert('succes', `
      ${addBrand} </br>
      ${addModel} </br>
      ${addPrice} </br>
      ${addImgUrl1} </br>
      ${addImgUrl2} </br>
      ${addImgUrl3} </br>
      ${addType} </br>
      ${addDisplacement} </br>
      ${addBorexStroke} </br>
      ${addCompressionRatio} </br>
      ${addHorsepower} </br>
      ${addTorque} </br>
      ${addFuelSystem} </br>
      ${addGearbox} </br>
      `)
    }
  }
  // end add product logic


  // products pagination
  const lastMotoIndex = adminStore.productsActivePage * adminStore.productsObjectsPerPage
  const firstMotoIndex = lastMotoIndex - adminStore.productsObjectsPerPage
  const currentMoto = serverStore.MotoDataCopy.slice(firstMotoIndex, lastMotoIndex)

  return (
    <div className="admin">
      <BackUpBtn whenShow='750' debugLine='false'></BackUpBtn>

      <div className="tabsContainer">

        <ul className="nav nav-tabs" id="myTab" role="tablist">

          <li className="nav-item" role="presentation">
            <button className="nav-link active" id="products-tab" data-bs-toggle="tab" data-bs-target="#products" type="button"
              role="tab" aria-controls="products" aria-selected="false">Товари</button>
          </li>

          <li className="nav-item" role="presentation">
            <button className="nav-link" id="news-tab" data-bs-toggle="tab" data-bs-target="#news" type="button"
              role="tab" aria-controls="news" aria-selected="false">Новини</button>
          </li>

          <li className="nav-item" role="presentation">
            <button className="nav-link disabled" id="orders-tab" data-bs-toggle="tab" data-bs-target="#orders" type="button"
              role="tab" aria-controls="orders" aria-selected="false">Замовлення</button>
          </li>

          <li className="nav-item" role="presentation">
            <button className="nav-link disabled" id="users-tab" data-bs-toggle="tab" data-bs-target="#users" type="button"
              role="tab" aria-controls="users" aria-selected="false">Користувачі</button>
          </li>
        </ul>

        <div className="tab-content">
          {/* ========== PRODUCTS ========== */}
          <div className="tab-pane active" id="products"
            role="tabpanel" aria-labelledby="products-tab" tabIndex="0">

            <div>
              {
                showProductsLoader ?
                  <div style={{ height: '300px', display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <div className="loader active" id="loader-2">
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                  </div>
                  :
                  <>
                    <div className='admin__controlsWrap | p-4'>
                      <div className='row d-flex align-items-center'>
                        <div className='col-12 col-lg-12 col-xl-4'>
                          {/* inputs */}
                          <input type="text" className="form-control mt-3 mb-3" placeholder={t('shop_page.controls.input-brand-placeholder')} ref={BrandValue} />
                          <input type="text" className="form-control mt-4 mb-3" placeholder={t('shop_page.controls.input-model-placeholder')} ref={ModelValue} />
                        </div>

                        <div className='col-12 col-md-6 col-xl-4'>
                          {/* selects */}
                          <select ref={SelectType} onChange={getMotoNameToType} className="form-select mt-3 mb-3">
                            <option defaultValue value="0">{t('shop_page.controls.select-defaultValue')}</option>
                            <option value="Sport">{t('shop_page.controls.select-sport')}</option>
                            <option value="Adventure">{t('shop_page.controls.select-adventure')}</option>
                            <option value="Cruiser">{t('shop_page.controls.select-cruiser')}</option>
                            <option value="Classic">{t('shop_page.controls.select-classic')}</option>
                            <option value="Motard">{t('shop_page.controls.select-motard')}</option>
                            <option value="Naked">{t('shop_page.controls.select-naked')}</option>
                            <option value="Scrambler">{t('shop_page.controls.select-scrambler')}</option>
                            <option value="Retro">{t('shop_page.controls.select-retro')}</option>
                          </select>
                          <select ref={SelectModel} className="form-select mt-4 mb-3">
                            {
                              serverStore.ArrTypeName.map((i) => {
                                return <option key={i} value={i}>{i}</option>
                              })
                            }
                            <option defaultValue value="0"> {t('shop_page.controls.select_2-defaultValue')} </option>
                          </select>
                        </div>

                        <div className='col-12 col-md-6 col-xl-4'>
                          {/* buttons */}
                          <div className='d-flex justify-content-center row'>
                            <a className="mainButton controls-btnFind | btn col-sm-5 px-4 py-2" role="button" onClick={sortData}>{t('shop_page.controls.btn_1-title')}</a>
                            <button type="button" className="btn col-sm-5  mainButton px-4 py-2" onClick={ClearSort}>{t('shop_page.controls.btn_2-title')}</button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className='admin__supControls | row align-items-center mt-3'>
                      <div className='col admin__supControls-nowDisplay'>
                        <span>{t('shop_page.sup-controls.isDisplayed', { currentPage: adminStore.productsActivePage, allPages: adminStore.productsCountPages })}</span>
                      </div>

                      <div className='col-12 col-sm-12 col-md-3 col-lg-3 col-xl-3 d-flex justify-content-end'>
                        <select ref={SortCash} onChange={sortCash} className="form-select">
                          <option defaultValue value="0">{t('shop_page.sup-controls.selectPrice-defaultValue')}</option>
                          <option value="upper">{t('shop_page.sup-controls.selectPrice-ascending')}</option>
                          <option value="lower">{t('shop_page.sup-controls.selectPrice-descending')}</option>
                        </select>
                      </div>

                      <button class="mainButton | btn py-2 | ms-sm-0 ms-md-4 ms-lg-4 ms-xl-4 | col-12 col-sm-12 col-md-3 col-lg-3 col-xl-3" type="button" data-bs-toggle="collapse" data-bs-target="#collapseAddProduct" aria-expanded="false" aria-controls="collapseAddProduct">
                        Додати новий товар
                      </button>
                      <div class="collapse px-0 mt-3" id="collapseAddProduct">
                        <div class="card card-body addProductForm-cont">
                          <form className='addProduct-form'>
                            <div className='row'>

                              <div className='form-col | col-12 col-sm-6	col-md-6 col-lg-4'>
                                {oneField('100%', 'text', 'Бренд', 'addBrand', aF.values.addBrand, aF.errors.addBrand)}
                                {oneField('100%', 'text', 'Модель', 'addModel', aF.values.addModel, aF.errors.addModel)}
                                {oneField('100%', 'number', 'Ціна', 'addPrice', aF.values.addPrice, aF.errors.addPrice)}
                                {oneField('100%', 'text', 'Тип', 'addType', aF.values.addType, aF.errors.addType)}
                                {oneField('100%', 'text', 'Кубатура двигуна', 'addDisplacement', aF.values.addDisplacement, aF.errors.addDisplacement)}
                                {oneField('100%', 'text', 'Діаметр поршнів', 'addBorexStroke', aF.values.addBorexStroke, aF.errors.addBorexStroke)}
                              </div>

                              <div className='form-col | col-12 col-sm-6 col-md-6 col-lg-4'>
                                {oneField('100%', 'text', 'Крутний момент', 'addTorque', aF.values.addTorque, aF.errors.addTorque)}
                                {oneField('100%', 'text', 'Коефіцієнт стиснення', 'addCompressionRatio', aF.values.addCompressionRatio, aF.errors.addCompressionRatio)}
                                {oneField('100%', 'text', 'Кількість кіньських сил', 'addHorsepower', aF.values.addHorsepower, aF.errors.addHorsepower)}
                                {oneField('100%', 'text', 'Картинка 1', 'addImgUrl1', aF.values.addImgUrl1, aF.errors.addImgUrl1)}
                                {oneField('100%', 'text', 'Картинка 2', 'addImgUrl2', aF.values.addImgUrl2, aF.errors.addImgUrl2)}
                                {oneField('100%', 'text', 'Картинка 3', 'addImgUrl3', aF.values.addImgUrl3, aF.errors.addImgUrl3)}
                              </div>

                              <div className="form-col third-item | col-12	col-sm-12 col-md-12	col-lg-4">
                                <div>
                                  <div className='textarea-items'>
                                    <textarea className='form-control' placeholder='Паливна система'
                                      name="addFuelSystem" onChange={aF.handleChange} value={aF.values.addFuelSystem}></textarea>

                                    <div className='error-string'>{aF.errors.addFuelSystem ? aF.errors.addFuelSystem : ""}</div>
                                  </div>

                                  <div className='textarea-items'>
                                    <textarea className='form-control' placeholder='Коробка передач'
                                      name="addGearbox" onChange={aF.handleChange} value={aF.values.addGearbox}></textarea>

                                    <div className='error-string'>{aF.errors.addGearbox ? aF.errors.addGearbox : ""}</div>
                                  </div>
                                </div>

                                <button onClick={addNewProduct}
                                  className={aF.isValid && aF.dirty ? "mainButton save | btn" : "mainButton save btn disabled | btn"}>Додати ggg</button>
                              </div>

                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                    <div className='error-shop'>{ErrorMotoSort}</div>
                    {
                      <>
                        {currentMoto.map((p) => {
                          return <AdminProduct key={p._id} data={p}></AdminProduct>
                        })}
                        <AdminProductsPagination
                          shortPagination={true}
                          dataLength={serverStore.MotoDataCopy.length}
                        ></AdminProductsPagination>
                      </>
                    }
                  </>
              }
            </div>
          </div>

          {/* ========== NEWS ========== */}
          <div className="tab-pane" id="news"
            role="tabpanel" aria-labelledby="news-tab" tabIndex="0">Новини</div>

          {/* ========== ORDERS ========== */}
          <div className="tab-pane" id="orders"
            role="tabpanel" aria-labelledby="orders-tab" tabIndex="0">Замовлення</div>

          {/* ========== USERS ========== */}
          <div className="tab-pane" id="users"
            role="tabpanel" aria-labelledby="users-tab" tabIndex="0">Користувачі</div>
        </div>

      </div >

    </div >
  )
})

export default Admin