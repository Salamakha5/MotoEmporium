import React, { useEffect, useState } from 'react'
import './Shop.scss'
import { observer } from 'mobx-react-lite'
import OneProduct from '../../components/OneProduct/OneProduct'
import serverStore from '../../store/serverStore'
import { toJS } from 'mobx'

const Shop = observer(()=>{
    useEffect(()=>{
        serverStore.getAllMoto()
    },[])
    return <div className='shop_container'>
        <div className='container p-4 main_cont'>
            <div className='select_block'>
                <div>
                    <h4 className='p-4 pb-1'>SEARCH INVENTORY</h4>
                    <div className='row d-flex  align-items-center'>
                        <div className='col'>
                        <input type="text" class="form-control m-3" placeholder="Пошук по назві моделі"/>
                        <input type="number" class="form-control m-3" placeholder="Пошук по ціні"/>
                        </div>
                        <div className='col'>
                        <select className="form-select m-3" aria-label="Default select example">
                          <option selected>Пошук по категоріям</option>
                          <option value="1">One</option>
                          <option value="2">Two</option>
                          <option value="3">Three</option>
                        </select>
                        <select className="form-select m-3" aria-label="Default select example">
                          <option selected>Пошук по моделі</option>
                          <option value="1">One</option>
                          <option value="2">Two</option>
                          <option value="3">Three</option>
                        </select>
                        </div>
                        <div className='col'>
                            <div className='d-flex justify-content-center'>
                            <button type="button" class="m-3 btn btn-warning">Пошук</button>
                            <button type="button" class="m-3 btn btn-warning">Очистити фільтри</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='line_cont'>
                <div>
                    <span>Displaying 1 of {toJS(serverStore.MotoData).length}</span>
                </div>
                
                <div className='d-flex justify-content-end align-items-center'>
                <select className="form-select m-3" aria-label="Default select example">
                          <option selected>По популярності</option>
                          <option value="1">One</option>
                          <option value="2">Two</option>
                          <option value="3">Three</option>
                        </select>
                <select className="form-select m-3" aria-label="Default select example">
                          <option selected>По ціні</option>
                          <option value="1">One</option>
                          <option value="2">Two</option>
                          <option value="3">Three</option>
                        </select>
                </div>
            </div>
            <div className={'d-flex justify-content-center mt-5 '+serverStore.spinerShop}>
                <div class="spinner-border text-warning" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
            </div>
            <div className='row d-flex justify-content-evenly mt-2'>
                {
                    toJS(serverStore.MotoData).map((p)=>{
                       return <OneProduct key={p.id} data={p}></OneProduct>
                    })
                }
            </div>
        </div>
    </div>
})

export default Shop