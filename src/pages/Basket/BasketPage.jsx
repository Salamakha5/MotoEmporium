import { observer } from "mobx-react-lite"
import BasketCard from "../../components/BasketCard/BasketCard"
import serverStore from "../../store/serverStore"
import "./BasketPage.scss"
import React, { useEffect, useState } from 'react'
import { toJS } from "mobx"
import clientStore from "../../store/clientStore"
import basketStore from "../../store/basketStore"

const BasketPage = observer(() => {

    useEffect(() => {
        if(serverStore.MotoData.length > 1){
            basketStore.getBasketMoto()
        }else{
            serverStore.getAllMoto(()=>{
                basketStore.getBasketMoto()
            })
        }
    }, [])
    // Скидка 20%
    let tallage = 20

    return (
        <div className="BasketPage_container p-5">
            <div className="row">
                <div className="col p-3 pt-0 Card_Container">
                    {
                        basketStore.BasketData.map((moto) => {
                            return <BasketCard key={moto._id} data={moto}></BasketCard>
                        })
                    }
                </div>
                <div className="col p-0 d-flex justify-content-center">
                    <div className="BasketPrise_cont p-2">
                        <div className="text-center pt-2">
                            <strong>Скидка на першу покупку 20%</strong>
                        </div>
                        <div className="pt-3 border-bottom border-2 border-dark">
                            <div className="d-flex justify-content-center align-items-center">
                                <ul>
                                    {
                                        basketStore.BasketData.map((moto) => {
                                            return <li className="fs-5 mt-1" key={moto._id}>{moto.brand}/{moto.model} - {clientStore.formatPrice(moto.price)}</li>
                                        })
                                    }
                                </ul>
                            </div>
                            <div className=" fs-3 d-flex me-5 mt-3 mb-3 justify-content-end align-items-center"><span className="fs-1">/</span><span className="basket_price">{clientStore.formatPrice(basketStore.AllPriceMoto)}</span></div>
                        </div>

                        <div>
                            <div className="text-center mt-3">
                                <strong>+ Скадка на першу покупку 20%</strong>
                            </div>
                            <p className="mt-4 ms-4 fs-3">Разом: <span className="basket_price"><span className="Allprice">{clientStore.formatPrice(basketStore.AllPriceMoto)}</span>/{clientStore.formatPrice(basketStore.AllPriceMoto - (basketStore.AllPriceMoto / 100 * tallage))}</span></p>
                            <div className=" mt-3 d-flex justify-content-center align-items-center">
                                <button className="btn_basket">Оформити замавлення</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
})

export default BasketPage