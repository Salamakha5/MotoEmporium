import './Shop.scss'

import OneProduct from '../../components/OneProduct/OneProduct'
import serverStore from '../../store/serverStore'

import { createRef, useEffect, useState } from 'react'
import { observer } from 'mobx-react-lite'
import { toJS } from 'mobx'

const Shop = observer(() => {
    useEffect(() => {
        document.title = "Shop - MotoEmporium";
        serverStore.getAllMoto()
    }, [])
    let BrandValue = createRef()
    let ModelValue = createRef()
    let SelectType = createRef()
    let SelectModel = createRef()
    let SortCash = createRef()

    function sortCash(){
        serverStore.SortCash(SortCash.current.value)
    }

    function getMotoNameToType(){
        serverStore.getMotoNameToType(SelectType.current.value)
    }
    function sortData(){
        let obj = {
            SortToBrand:BrandValue.current.value,
            SortToModel:ModelValue.current.value,
            SortSelectCatigories:SelectType.current.value,
            SortSelectModel:SelectModel.current.value,
        }
        serverStore.sortMotoData(obj)
    }
    function ClearSort(){
        serverStore.getAllMoto()
        BrandValue.current.value = ""
        ModelValue.current.value = ""
        SelectType.current.value = "0"
        SelectModel.current.value = "0"
    
    }


    return (
        <div className='moto-shop | pt-5 pb-3'>
            <div className='moto-shop__container | container p-4'>
                <div className='moto-shop__controlsWrap | p-4'>
                    <div className='controlsWrap-title'>НАЛАШТУВАННЯ ПОШУКУ</div>

                    <div className='row d-flex align-items-center'>
                        <div className='col-12 col-lg-12 col-xl-4'>
                            {/* inputs */}
                            <input type="text" className="form-control mt-3 mb-3" placeholder="Пошук по марці" ref={BrandValue}/>
                            <input type="text" className="form-control mt-4 mb-3" placeholder="Пошук по назві моделі" ref={ModelValue}/>
                        </div>

                        <div className='col-12 col-md-6 col-xl-4'>
                            {/* selects */}
                            <select ref={SelectType} onChange={getMotoNameToType}  className="form-select mt-3 mb-3">
                                <option defaultValue value="0">Пошук по категоріям/Всі</option>
                                <option value="Sport">Спорт</option>
                                <option value="Adventure">Подорожі</option>
                                <option value="Cruiser">Крейсер</option>
                                <option value="Classic">Класичний</option>
                                <option value="Motard">Мотард</option>
                                <option value="Naked">Найкед</option>
                                <option value="Scrambler">Скремблер</option>
                                <option value="Retro">Cтарі</option>
                            </select>
                            <select ref={SelectModel} className="form-select mt-4 mb-3">
                                {
                                    serverStore.ArrTypeName.map((i)=>{
                                        return <option key={i} value={i}>{i}</option>
                                        
                                    })
                                }
                                <option defaultValue value="0">Пошук по моделі/Всі</option>
                            </select>
                        </div>
                                
                        <div className='col-12 col-md-6 col-xl-4'>
                            {/* buttons */}
                            <div className='d-flex justify-content-center row'>
                                <a className="btn  moto-shop__controls-btnFind | btn btn-warning col-sm-5  mainButton px-4 py-2" role="button" onClick={sortData}>Пошук</a>
                                <button type="button" className="btn btn-warning col-sm-5  mainButton px-4 py-2" onClick={ClearSort}>Очистити фільтри</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='error-shop'>{serverStore.ErrorMotoSort}</div>
                <div className='moto-shop__supControls | row align-items-center pt-5 pb-4 mb-4'>
                    <div className='col moto-shop__supControls-nowDisplay'>
                        <span>Відображається 1 із {toJS(serverStore.MotoData).length} сторінок</span>
                    </div>

                    <div className='col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 d-flex justify-content-end'>
                        <select ref={SortCash} onChange={sortCash} className="form-select">
                            <option defaultValue value="0">По ціні</option>
                            <option value="upper">За зростанням</option>
                            <option value="lower">За спаданням</option>
                        </select>
                    </div>
                </div>

                {/* loader */}
                <div className={'d-flex justify-content-center mt-5 ' + serverStore.spinerShop}>
                    <div className="spinner-border text-warning" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>

                <div className='moto-shop__showcase | row'>
                    {
                        toJS(serverStore.MotoDataCopy).map((p) => {
                            return <OneProduct key={p.id} data={p}></OneProduct>
                        })
                    }
                </div>
            </div>
        </div>
    )
})

export default Shop