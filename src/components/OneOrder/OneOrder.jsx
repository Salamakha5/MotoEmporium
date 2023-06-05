import './OneOrder.scss'
import { useTranslation } from 'react-i18next';
import { observer } from 'mobx-react-lite'

import React, { useState } from 'react'
import clientStore from '../../store/clientStore'
import axios from 'axios'
import alertify from 'alertifyjs'

const OneOrder = observer((props) => {
    const [FullOrderInfo, setFullOrderInfo] = useState()
    const [isOrderActive, setisOrderActive] = useState(true)
    function OpenFullOrder() {
        if (FullOrderInfo) { setFullOrderInfo(!FullOrderInfo) }
        else { setFullOrderInfo(!FullOrderInfo) }
    }
    const { t } = useTranslation();

    function DeleteOrder() {
        axios.post("https://moto-server.onrender.com/api/deleteOrderById", { id: props.data._id })
            .then((response) => {
                setisOrderActive(false)
            })
            .catch((error) => {
                console.log(error);
            })
    }

    function sureWantDeleteOrder() {
        alertify.confirm('Попередження', 'Ви впевнені що хочете відмінити замовлення?',
            function () {
                DeleteOrder()
                alertify.success('Ви відмінили замовлення!')
            },
            function () { alertify.success('Відміну скасовано') })

        // console.log(alertify.alert().set("class", 'ggg'));
    }

    return (
        <div>
            {
                isOrderActive ?
                    <div className='oneOrder_container || row '>
                        <div className="col d-flex align-items-center">
                            <div>
                                <div className='num_order || mb-1'>{props.data.SerialNumber}</div>
                                <div className='username || fs-4 mt-1'>{props.data.fullName}</div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="text-end">{t("Order_Page.DateOfOrder")}- <span className='date_order'>{props.data.DateOfBuy}</span></div>
                            <div className='d-flex mt-2 justify-content-end align-items-center'>

                                {FullOrderInfo ?
                                    <button style={{ backgroundColor: "red" }} className='mainButton | btn justify-content-end align-items-center'
                                        onClick={OpenFullOrder}>
                                        <span>✕</span>
                                    </button>
                                    :
                                    <button className='mainButton | btn justify-content-end align-items-center'
                                        onClick={OpenFullOrder}>
                                        <i className="bi bi-gear-fill me-1"></i> <span>{t("Order_Page.Details")}</span>
                                    </button>
                                }
                            </div>
                        </div>
                        {/* orderFull */}
                        {
                            FullOrderInfo ?
                                <div className='orderFull'>
                                    <div className='d-block d-md-flex justify-content-between'>
                                        <p className='pb-2 fs-5'>{t("Order_Page.FullName")} : {props.data.fullName}</p>
                                        <p className='pb-2 fs-5'>{t("Order_Page.Phone")} : {props.data.PhoneNumber}</p>
                                    </div>
                                    <p className='fs-5 mb-2'>{t("Order_Page.Status")} - {t("Order_Page.Packaging")}...</p>
                                    <p className='fs-5 mb-2'>{t("Order_Page.City")} - {props.data.City}/{props.data.PostOffice}</p>
                                    <span>{t("Order_Page.OrderList")}:</span>
                                    <ol className='mt-2'>
                                        {
                                            props.data.BuyedMoto.map((data) => {
                                                return <li key={data._id}>{data.brand} {data.model} - {clientStore.formatPrice(data.price)} (X {data.current})</li>
                                            })
                                        }

                                    </ol>
                                    <p className='fs-5 mb-2'>{t("Order_Page.Card")} - {props.data.CreditCard}</p>
                                    <div className='text_Discount | text-end mb-2'>{t("Order_Page.Discount")} 20%</div>
                                    <div className='text-end'>{t("Order_Page.AllPrice")} - <span className='text_Price'>{clientStore.formatPrice(props.data.AllPrice)}</span></div>
                                    <div className='d-flex mt-3 justify-content-between align-items-center'>
                                        <p className='d-none d-sm-block'>{t("Order_Page.SettPhone")} - +38012345678</p>
                                        <button className='mainButton p-2'
                                            onClick={sureWantDeleteOrder}
                                        >{t("Order_Page.DeleteOrder")}</button>
                                    </div>
                                </div>
                                :
                                false
                        }
                        {/* orderFull */}


                    </div>
                    :
                    false
            }
        </div>
    )
})

export default OneOrder