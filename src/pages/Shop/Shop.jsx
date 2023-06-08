import './Shop.scss'

import OneCard from '../../components/OneCard/OneCard'
import ShopPagination from '../../components/Pagination/ShopPagination'
import serverStore from '../../store/serverStore'
import BackUpBtn from '../../components/BackUpBtn/BackUpBtn'

import alertify from 'alertifyjs'
import { createRef, useEffect, useState } from 'react'
import { observer } from 'mobx-react-lite'
import { useTranslation } from 'react-i18next';
import { toJS } from 'mobx'
import { useNavigate } from "react-router-dom";

const Shop = observer(() => {

    const navigate = useNavigate()
    const { t } = useTranslation();

    useEffect(() => {

        if (serverStore.userIsAuth == true) {
            document.title = "Shop | MotoEmporium";

            setSpinerShop("d-block")

            serverStore.getAllMoto(() => {
                setSpinerShop("d-none")
            })
        } else if (localStorage.getItem("IsAuthMOTO") == null) {
            youNeedToLogin();
        }

    }, [])


    function youNeedToLogin() {

        alertify.confirm(t('shop_page.youNeedToLogin.title'), t('shop_page.youNeedToLogin.text'),
            function () {
                navigate('/login')
            },
            function () {
                alertify.error(t('shop_page.youNeedToLogin.cancel-notify'))
                navigate('/')
            })
    }

    let BrandValue = createRef()
    let ModelValue = createRef()
    let SelectType = createRef()
    let SelectModel = createRef()
    let SortCash = createRef()

    const [ErrorMotoSort, setErrorMotoSort] = useState("")
    const [spinerShop, setSpinerShop] = useState([])

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
        serverStore.setMotoActivePage(1)

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
                console.log("SortSelectModel");
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
        serverStore.setMotoActivePage(1)
    }

    // pagination
    const lastMotoIndex = serverStore.motoActivePage * serverStore.motoObjectsPerPage
    const firstMotoIndex = lastMotoIndex - serverStore.motoObjectsPerPage
    const currentMoto = serverStore.MotoDataCopy.slice(firstMotoIndex, lastMotoIndex)

    return (
        <div className='moto-shop | pt-5 pb-3'>
            <BackUpBtn whenShow='700' debugLine='false'></BackUpBtn>

            <div className='moto-shop__container | container p-4'>
                <div className='moto-shop__controlsWrap | p-4'>
                    <div className='controlsWrap-title'> {t('shop_page.controls.title')} </div>

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
                                <a className="mainButton moto-shop__controls-btnFind | btn col-sm-5 px-4 py-2" role="button" onClick={sortData}>{t('shop_page.controls.btn_1-title')}</a>
                                <button type="button" className="btn col-sm-5  mainButton px-4 py-2" onClick={ClearSort}>{t('shop_page.controls.btn_2-title')}</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='error-shop'>{ErrorMotoSort}</div>
                <div className='moto-shop__supControls | row align-items-center pt-5 pb-4 mb-4'>
                    <div className='col moto-shop__supControls-nowDisplay'>
                        <span>{t('shop_page.sup-controls.isDisplayed', { currentPage: serverStore.motoActivePage, allPages: serverStore.motoCountPages })}</span>
                    </div>

                    <div className='col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 d-flex justify-content-end'>
                        <select ref={SortCash} onChange={sortCash} className="form-select">
                            <option defaultValue value="0">{t('shop_page.sup-controls.selectPrice-defaultValue')}</option>
                            <option value="upper">{t('shop_page.sup-controls.selectPrice-ascending')}</option>
                            <option value="lower">{t('shop_page.sup-controls.selectPrice-descending')}</option>
                        </select>
                    </div>
                </div>

                {/* loader */}
                <div className={'d-flex justify-content-center my-5 ' + spinerShop}>
                    <div className="loader active" id="loader-2">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </div>

                <div className='moto-shop__showcase | row'>
                    {
                        currentMoto.map((p) => {
                            return <OneCard key={p._id} data={p}></OneCard>
                        })
                    }
                </div>

                <div className='d-flex justify-content-center align-items-center'>
                    <ShopPagination
                        shortPagination={true}
                        dataLength={serverStore.MotoDataCopy.length}
                    ></ShopPagination>
                </div>
            </div>
        </div>
    )
})

export default Shop