import './Shop.scss'

import OneProduct from '../../components/OneProduct/OneProduct'
import serverStore from '../../store/serverStore'

import { useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import { toJS } from 'mobx'

const Shop = observer(() => {

    useEffect(() => {
        document.title = "Shop - MotoEmporium";
        serverStore.getAllMoto()
    }, [])

    return (

        <div className='moto-shop | pt-5 pb-3'>
            <div className='moto-shop__container | container p-4'>
                <div className='moto-shop__controlsWrap | p-4'>
                    <div className='controlsWrap-title'>НАЛАШТУВАННЯ ПОШУКУ</div>

                    <div className='row d-flex align-items-center'>
                        <div className='col-12 col-lg-12 col-xl-4'>
                            {/* inputs */}
                            <input type="text" className="form-control mt-3 mb-3" placeholder="Пошук по назві моделі" />
                            <input type="number" className="form-control mt-4 mb-3" placeholder="Пошук по ціні" min='0' />
                        </div>

                        <div className='col-12 col-md-6 col-xl-4'>
                            {/* selects */}
                            <select className="form-select mt-3 mb-3" aria-label="Default select example">
                                <option defaultValue>Пошук по категоріям</option>
                                <option value="1">One</option>
                                <option value="2">Two</option>
                                <option value="3">Three</option>
                            </select>
                            <select className="form-select mt-4 mb-3" aria-label="Default select example">
                                <option defaultValue>Пошук по моделі</option>
                                <option value="1">One</option>
                                <option value="2">Two</option>
                                <option value="3">Three</option>
                            </select>
                        </div>

                        <div className='col-12 col-md-6 col-xl-4'>
                            {/* buttons */}
                            <div className='d-flex justify-content-center row'>
                                <button type="button" className="moto-shop__controls-btnFind | btn btn-warning col-sm-5  mainButton px-4 py-2">Пошук</button>
                                <button type="button" className="btn btn-warning col-sm-5  mainButton px-4 py-2">Очистити фільтри</button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='moto-shop__supControls | row align-items-center pt-5 pb-4 mb-4'>
                    <div className='col moto-shop__supControls-nowDisplay'>
                        <span>Відображається 1 із {toJS(serverStore.MotoData).length} сторінок</span>
                    </div>

                    <div className='col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 d-flex justify-content-end'>
                        <select className="form-select me-4">
                            <option defaultValue>По популярності</option>
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                        </select>
                        <select className="form-select">
                            <option defaultValue>По ціні</option>
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
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
                        toJS(serverStore.MotoData).map((p) => {
                            return <OneProduct key={p.id} data={p}></OneProduct>
                        })
                    }
                </div>
            </div>
        </div>
    )
})

export default Shop