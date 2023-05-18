import { observer } from "mobx-react-lite"
import BasketCard from "../../components/BasketCard/BasketCard"
import serverStore from "../../store/serverStore"
import "./BasketPage.scss"
import React, { useEffect, useState } from 'react'
import { toJS } from "mobx"
import clientStore from "../../store/clientStore"
import basketStore from "../../store/basketStore"
import PriceList from "../../components/PriceList/PriceList"
import { useTranslation } from 'react-i18next';

const BasketPage = observer(() => {

    useEffect(() => {
        if (serverStore.MotoData.length > 1) {
            basketStore.getBasketMoto()
        } else {
            serverStore.getAllMoto(() => {
                basketStore.getBasketMoto()
            })
        }
    }, [])
    const { t } = useTranslation();

    // Скидка 20%
    let tallage = 20

    return (
        <div className="BasketPage_container">
            <div className="row d-flex justify-content-center">
                <div className="col-12 col-lg-6 order-2 order-lg-1 p-3 pt-0 Card_Container">
                    {
                        basketStore.BasketData.length > 0 ?
                            <div>
                                {
                                    basketStore.BasketData.map((moto) => {
                                        return <BasketCard key={moto._id} data={moto}></BasketCard>
                                    })
                                }
                            </div>
                            :
                            <div className="h-100 fs-4 d-flex justify-content-center align-items-center">{t("basket_page.current_basket")}</div>
                    }


                </div>
                <div className="col-12 col-lg-6 order-1 order-lg-2 p-0 d-flex justify-content-center">
                    <div className="BasketPrise_cont p-2">
                        <div className="pt-1">
                            <div className="BasketPrise_cont__title pb-3">{t("basket_page.shop_cart")}</div>
                            <div className="d-flex justify-content-center align-items-center">
                                <ul>
                                    {
                                        basketStore.BasketData.map((moto) => {
                                            return <PriceList key={moto._id} moto={moto}></PriceList>
                                        })
                                    }
                                </ul>
                            </div>
                            <div className=" fs-3 d-flex me-5 mt-3 mb-3 justify-content-end align-items-center"><span className="fs-1"></span><span className="basket_price">{clientStore.formatPrice(basketStore.AllPriceMoto)}</span></div>
                        </div>

                        <div className="pt-3 border-top border-1 border-dark">
                            <p className="fs-3 ps-4">{t("basket_page.allPrice")}: <span className="basket_price"><span className="Allprice">{clientStore.formatPrice(basketStore.AllPriceMoto)}</span>/{clientStore.formatPrice(basketStore.AllPriceMoto - (basketStore.AllPriceMoto / 100 * tallage))}</span></p>
                            <div className="mt-3 ps-4">
                                <strong>{t("basket_page.DiscountfirstMoto")} 20%</strong>
                            </div>
                            <div className="mt-5 d-flex justify-content-center align-items-center">
                                <button className="btn_basket">{t("basket_page.btn_buyMoto")}</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
})

export default BasketPage