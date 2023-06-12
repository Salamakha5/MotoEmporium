import './Admin.scss'

import BackUpBtn from '../../components/BackUpBtn/BackUpBtn'
import AdminProduct from '../../components/adminItems/AdminProduct/AdminProduct'
import AdminProductsPagination from '../../components/Pagination/AdminProductsPagination'
import AdminNewsItem from '../../components/adminItems/AdminNewsItem/AdminNewsItem'
import NewsPagination from '../../components/Pagination/NewsPagination'
import serverStore from '../../store/serverStore'
import newsStore from '../../store/newsStore'
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

  // global variables
  const { t, i18n } = useTranslation();
  const navigate = useNavigate()

  // product variables
  const [showProductsLoader, setShowProductsLoader] = useState(true)

  // news variables
  const [showNewsLoader, setShowNewsLoader] = useState(true)

  useEffect(() => {
    document.title = "Admin page | MotoEmporium";

    serverStore.getAllMoto(() => {
      setShowProductsLoader(false)
    })

    newsStore.getAllNews(() => {
      setShowNewsLoader(false)
    })

  }, [])

  function oneField(width, currentFormik, type, placeholder, name, initialValObject, errorsObject) {

    return (
      <div className='addFormItem'>
        <input style={{ width: width }} type={type} placeholder={placeholder} className='form-control'
          name={name} onChange={currentFormik.handleChange} value={initialValObject}></input>

        <div className='error-string'>{errorsObject ? errorsObject : ""}</div>
      </div >
    )
  }

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
      // addBrand: 'Huyati',
      // addModel: 'Hueta c300',
      // addPrice: 99999,
      // addImgUrl1: 'https://images.unsplash.com/photo-1589122350591-964f4987a296?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
      // addImgUrl2: 'https://images.unsplash.com/photo-1589122350591-964f4987a296?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
      // addImgUrl3: 'https://images.unsplash.com/photo-1589122350591-964f4987a296?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
      // addType: 'Sport',
      // addDisplacement: '8567 cc',
      // addBorexStroke: '450 x 7.85 mm',
      // addCompressionRatio: '17.56:07',
      // addHorsepower: '109 hp',
      // addTorque: '645 lb-ft',
      // addFuelSystem: 'Electronic fuel injection, 53 mm throttle bodies',
      // addGearbox: '6-speed with Ducati Quick Shift (DQS) up/down'
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

  function addNewProduct(e) {
    e.preventDefault()

    let { addBrand, addModel, addPrice, addImgUrl1, addImgUrl2, addImgUrl3, addType, addDisplacement,
      addBorexStroke, addCompressionRatio, addHorsepower, addTorque, addFuelSystem, addGearbox } = aF.values

    if (aF.isValid) {
      // ! алерт просто для провірки данних
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


  // start news logic
  let selectSort = createRef()

  function sortNews() {
    if (selectSort.current.value == "new") {
      newsStore.newsData.sort((a, b) => (+b.indexData) - (+a.indexData))
    }
    if (selectSort.current.value == "maxStatus") {
      newsStore.newsData.sort((a, b) => (+b.status) - (+a.status))
    }
  }

  const addNews = useFormik({
    initialValues: {
      // addImg: '',
      // addHeaderEN: '',
      // addHeaderUA: '',
      // addTextEN: '',
      // addTextUA: '',
      // addDate: '',
      // addStatus: ''
    },
    validationSchema: Yup.object({
      addImg: Yup.string().min(5, t('yupErrors.valid-field', { num: 5 })).max(500, t('yupErrors.valid-maxLength', { num: 500 })).required(t('yupErrors.required')),
      addHeaderEN: Yup.string().min(15, t('yupErrors.valid-field', { num: 15 })).max(200, t('yupErrors.valid-maxLength', { num: 200 })).required(t('yupErrors.required')),
      addHeaderUA: Yup.string().min(15, t('yupErrors.valid-field', { num: 15 })).max(200, t('yupErrors.valid-maxLength', { num: 200 })).required(t('yupErrors.required')),
      addTextEN: Yup.string().min(50, t('yupErrors.valid-field', { num: 50 })).max(800, t('yupErrors.valid-maxLength', { num: 800 })).required(t('yupErrors.required')),
      addTextUA: Yup.string().min(50, t('yupErrors.valid-field', { num: 50 })).max(800, t('yupErrors.valid-maxLength', { num: 800 })).required(t('yupErrors.required')),
      addDate: Yup.string().min(10, t('yupErrors.valid-field', { num: 10 })).max(10, t('yupErrors.valid-maxLength', { num: 10 })).required(t('yupErrors.required')),
      addStatus: Yup.number().min(1, t('yupErrors.valid-noLessThan', { num: 1 })).max(10, t('yupErrors.valid-noMoreThan', { num: 10 })).required(t('yupErrors.required')),
    })
  })
  let aN = addNews

  function addNewProduct(e) {
    e.preventDefault()

    alert('hui')

    // let { addBrand, addModel, addPrice, addImgUrl1, addImgUrl2, addImgUrl3, addType, addDisplacement,
    //   addBorexStroke, addCompressionRatio, addHorsepower, addTorque, addFuelSystem, addGearbox } = aF.values

    // if (aF.isValid) {
    //   // ! алерт просто для провірки данних
    //   alertify.alert('succes', `
    //   ${addBrand} </br>
    //   ${addModel} </br>
    //   ${addPrice} </br>
    //   ${addImgUrl1} </br>
    //   ${addImgUrl2} </br>
    //   ${addImgUrl3} </br>
    //   ${addType} </br>
    //   ${addDisplacement} </br>
    //   ${addBorexStroke} </br>
    //   ${addCompressionRatio} </br>
    //   ${addHorsepower} </br>
    //   ${addTorque} </br>
    //   ${addFuelSystem} </br>
    //   ${addGearbox} </br>
    //   `)
    // }
  }
  // end news logic

  // news pagination
  const lastNewsIndex = newsStore.newsActivePage * newsStore.newsObjectsPerPage
  const firstNewsIndex = lastNewsIndex - newsStore.newsObjectsPerPage
  const currentNews = newsStore.newsData.slice(firstNewsIndex, lastNewsIndex)

  return (
    <div className="admin">
      <BackUpBtn whenShow='750' debugLine='false'></BackUpBtn>

      <div className="tabsContainer">

        <ul className="nav nav-tabs" id="myTab" role="tablist">

          <li className="nav-item" role="presentation">
            <button className="nav-link" id="products-tab" data-bs-toggle="tab" data-bs-target="#products" type="button"
              role="tab" aria-controls="products" aria-selected="false">{t('admin_page.products_tab.title')}</button>
          </li>

          <li className="nav-item" role="presentation">
            <button className="nav-link active" id="news-tab" data-bs-toggle="tab" data-bs-target="#news" type="button"
              role="tab" aria-controls="news" aria-selected="false">{t('admin_page.news_tab.title')}</button>
          </li>

          <li className="nav-item" role="presentation">
            <button className="nav-link disabled" id="orders-tab" data-bs-toggle="tab" data-bs-target="#orders" type="button"
              role="tab" aria-controls="orders" aria-selected="false">{t('admin_page.orders_tab.title')}</button>
          </li>

          <li className="nav-item" role="presentation">
            <button className="nav-link disabled" id="users-tab" data-bs-toggle="tab" data-bs-target="#users" type="button"
              role="tab" aria-controls="users" aria-selected="false">{t('admin_page.users_tab.title')}</button>
          </li>
        </ul>

        <div className="tab-content">
          {/* ========== PRODUCTS ========== */}
          <div className="tab-pane" id="products"
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

                      <button class="mainButton | btn py-2 | ms-sm-0 ms-md-4 ms-lg-4 ms-xl-4 | col-12 col-sm-12 col-md-3 col-lg-3 col-xl-3" type="button"
                        data-bs-toggle="collapse" data-bs-target="#collapseAddProduct" aria-expanded="false" aria-controls="collapseAddProduct">
                        {t('admin_page.products_tab.btnOpenAddProduct')}
                      </button>
                      <div class="collapse px-0 mt-3" id="collapseAddProduct">
                        <div class="card card-body addProductForm-cont">
                          <form className='addProduct-form'>
                            <div className='row'>

                              <div className='form-col | col-12 col-sm-6	col-md-6 col-lg-4'>
                                {oneField('100%', aF, 'text', t('moto_data.brand'), 'addBrand', aF.values.addBrand, aF.errors.addBrand)}
                                {oneField('100%', aF, 'text', t('moto_data.model'), 'addModel', aF.values.addModel, aF.errors.addModel)}
                                {oneField('100%', aF, 'number', t('moto_data.price'), 'addPrice', aF.values.addPrice, aF.errors.addPrice)}
                                {oneField('100%', aF, 'text', t('moto_data.type'), 'addType', aF.values.addType, aF.errors.addType)}
                                {oneField('100%', aF, 'text', t('moto_data.engineCapacity'), 'addDisplacement', aF.values.addDisplacement, aF.errors.addDisplacement)}
                                {oneField('100%', aF, 'text', t('moto_data.pistonDiameter'), 'addBorexStroke', aF.values.addBorexStroke, aF.errors.addBorexStroke)}
                              </div>

                              <div className='form-col | col-12 col-sm-6 col-md-6 col-lg-4'>
                                {oneField('100%', aF, 'text', t('moto_data.horsePower'), 'addHorsepower', aF.values.addHorsepower, aF.errors.addHorsepower)}
                                {oneField('100%', aF, 'text', t('moto_data.torque'), 'addTorque', aF.values.addTorque, aF.errors.addTorque)}
                                {oneField('100%', aF, 'text', t('moto_data.compressionRatio'), 'addCompressionRatio', aF.values.addCompressionRatio, aF.errors.addCompressionRatio)}
                                {oneField('100%', aF, 'text', t('moto_data.image', { imgNum: 1 }), 'addImgUrl1', aF.values.addImgUrl1, aF.errors.addImgUrl1)}
                                {oneField('100%', aF, 'text', t('moto_data.image', { imgNum: 2 }), 'addImgUrl2', aF.values.addImgUrl2, aF.errors.addImgUrl2)}
                                {oneField('100%', aF, 'text', t('moto_data.image', { imgNum: 3 }), 'addImgUrl3', aF.values.addImgUrl3, aF.errors.addImgUrl3)}
                              </div>

                              <div className="form-col third-item | col-12	col-sm-12 col-md-12	col-lg-4">
                                <div>
                                  <div className='textarea-items'>
                                    <textarea className='form-control' placeholder={t('moto_data.fuelSystem')}
                                      name="addFuelSystem" onChange={aF.handleChange} value={aF.values.addFuelSystem}></textarea>

                                    <div className='error-string'>{aF.errors.addFuelSystem ? aF.errors.addFuelSystem : ""}</div>
                                  </div>

                                  <div className='textarea-items'>
                                    <textarea className='form-control' placeholder={t('moto_data.gearbox')}
                                      name="addGearbox" onChange={aF.handleChange} value={aF.values.addGearbox}></textarea>

                                    <div className='error-string'>{aF.errors.addGearbox ? aF.errors.addGearbox : ""}</div>
                                  </div>
                                </div>

                                <button onClick={addNewProduct}
                                  className={aF.isValid && aF.dirty ? "mainButton save | btn" : "mainButton save btn disabled | btn"}
                                >{t('admin_page.btn-add')}</button>
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
          <div className="tab-pane active" id="news" role="tabpanel" aria-labelledby="news-tab" tabIndex="0">
            <div>
              {
                showNewsLoader ?
                  <div style={{ height: '300px', display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <div className="loader active" id="loader-2">
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                  </div>
                  :
                  <>
                    <div className="row d-flex justify-content-space-between">
                      <div className="col-12 col-sm-12 col-md-6 col-lg-6 d-flex align-items-center fs-5">{t('shop_page.sup-controls.isDisplayed',
                        { currentPage: newsStore.newsActivePage, allPages: newsStore.newsCountPages })}</div>
                      <div className="col-12 col-sm-12 col-md-3 col-lg-3 justify-content-end">
                        <select ref={selectSort} onChange={sortNews} className="form-select mt-3 mb-3 me-3" aria-label="Default select example">
                          <option value="default">{t('blog_page.selectDate-dafault')}</option>
                          <option value={"new"}>{t('blog_page.selectSort-new')}</option>
                          <option value={"maxStatus"}>{t('blog_page.selectRating-mostPopular')}</option>
                        </select>
                      </div>
                      <div className="col-12 col-sm-12 col-md-3 col-lg-3 d-flex align-items-center">
                        <button style={{ width: "100%" }} class="mainButton | btn py-2" type="button"
                          data-bs-toggle="collapse" data-bs-target="#collapseAddNews" aria-expanded="false" aria-controls="collapseAddNews">
                          {t('admin_page.news_tab.btnOpenAddNews')}
                        </button>
                      </div>
                      <div class="collapse px-0 mt-3" id="collapseAddNews">
                        <div class="card card-body addProductForm-cont">
                          <form className='addProduct-form'>
                            <div className='row'>

                              <div className='form-col | col-12 col-sm-6	col-md-6 col-lg-6'>
                                {oneField('100%', aN, 'text', 'Зображення', 'addImg', aN.values.addImg, aN.errors.addImg)}
                                {oneField('100%', aN, 'text', 'Заголовок (EN)', 'addHeaderEN', aN.values.addHeaderEN, aN.errors.addHeaderEN)}
                                {oneField('100%', aN, 'text', 'Заголовок (UA)', 'addHeaderUA', aN.values.addHeaderUA, aN.errors.addHeaderUA)}
                                {oneField('100%', aN, 'text', 'Дата', 'addDate', aN.values.addDate, aN.errors.addDate)}
                                {oneField('100%', aN, 'text', 'Рейтинг (1-10)', 'addStatus', aN.values.addStatus, aN.errors.addStatus)}
                              </div>

                              <div className="form-col third-item | col-12 col-sm-6 col-md-6 col-lg-6">
                                <div>
                                  <div className='textarea-items'>
                                    <textarea className='form-control' placeholder='Текст (EN)'
                                      name="addTextEN" onChange={aN.handleChange} value={aN.values.addTextEN}></textarea>

                                    <div className='error-string'>{aN.errors.addTextEN ? aN.errors.addTextEN : ""}</div>
                                  </div>

                                  <div className='textarea-items'>
                                    <textarea className='form-control' placeholder='Текст (UA)'
                                      name="addTextUA" onChange={aN.handleChange} value={aN.values.addTextUA}></textarea>

                                    <div className='error-string'>{aN.errors.addTextUA ? aN.errors.addTextUA : ""}</div>
                                  </div>
                                </div>

                                <button onClick={addNewProduct}
                                  className={aN.isValid && aN.dirty ? "mainButton save | btn" : "mainButton save btn disabled | btn"}
                                >{t('admin_page.btn-add')}</button>
                              </div>

                            </div>
                          </form>
                        </div>
                      </div>
                    </div>

                    {
                      <>
                        {currentNews.map((p) => {
                          return <AdminNewsItem key={p._id} data={p}></AdminNewsItem>
                        })}
                        <NewsPagination
                          shortPagination={true}
                          dataLength={newsStore.newsData.length}
                        ></NewsPagination>
                      </>
                    }
                  </>
              }
            </div>
          </div>

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