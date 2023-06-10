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

  function addNewProduct(params) {
    alertify.alert('succes', 'hui')
  }

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

                      <button class="mainButton | btn py-2 | ms-sm-0 ms-md-4 ms-lg-4 ms-xl-4 | col-12 col-sm-12 col-md-3 col-lg-3 col-xl-3" type="button" data-bs-toggle="collapse" data-bs-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
                        Додати новий товар
                      </button>
                      <div class="collapse px-0" id="collapseExample">
                        <div class="card card-body">
                          Some placeholder content for the collapse component. This panel is hidden by default but revealed when the user activates the relevant trigger.
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