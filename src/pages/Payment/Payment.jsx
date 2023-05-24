import './Payment.scss'

import payPalImg from '../../images/icons/paypal.png'
import applePayImg from '../../images/icons/applepay.png'
import testMotoImg from '../../images/logReg_bg.png'

import clientStore from '../../store/clientStore';
import serverStore from '../../store/serverStore';
import basketStore from '../../store/basketStore';
import { Link } from 'react-router-dom'
import { useNavigate } from "react-router-dom"
import { useEffect } from 'react';
import { toJS } from "mobx"
import { useFormik } from "formik";
import * as Yup from "yup"
import { useTranslation } from 'react-i18next';

const Payment = () => {

    const navigate = useNavigate()
    const { t } = useTranslation();

    useEffect(() => {
        document.title = 'Payment | MotoEmporium'

        if (serverStore.MotoData.length > 1) {
            basketStore.getBasketMoto()
            basketStore.getFavoriteMoto()

            console.log(toJS(basketStore.BasketData));

        } else {
            serverStore.getAllMoto(() => {
                basketStore.getBasketMoto()
                basketStore.getFavoriteMoto()

                console.log(toJS(basketStore.BasketData));
            })
        }

        // console.log(basketStore.BasketData);
    })

    const formik = useFormik({
        initialValues: {
            fullName: '',
            cardNumber: '',
            expiration: '',
            cvv: ''
        },
        validationSchema: Yup.object({
            fullName: Yup.string().required(t('yupErrors.required')).min(4, t('yupErrors.valid-name', { num: 7 })),
            cardNumber: Yup.string().required(t('yupErrors.required')).min(12, t('yupErrors.valid-cardNumber')),
            // email: Yup.string().required(t('yupErrors.required')).email(t('yupErrors.valid-email')),
            // password: Yup.string().required(t('yupErrors.required')).min(5, t('yupErrors.valid-password'))
        })
    })

    function confirmPayment() {
        alert('da da ya')
    }

    return (
        <div className='payment'>
            <div className="payment__details">

                <div className='method'>
                    <div className='title'>Payment Method</div>
                    <ul className='method__ul'>
                        <li>
                            <input className='custom-radio' type="radio" name='paymentMethod' id='creditCard' defaultChecked />
                            <label htmlFor='creditCard'><span>Credit Card</span></label>
                        </li>
                        <li>
                            <input className='custom-radio' type="radio" name='paymentMethod' id='payPal' disabled />
                            <label htmlFor='payPal'>
                                <img src={payPalImg} alt="PayPal" />
                            </label>
                        </li>
                        <li>
                            <input className='custom-radio' type="radio" name='paymentMethod' id='applePay' disabled />
                            <label htmlFor='applePay'>
                                <img src={applePayImg} alt="ApplePay" />
                            </label>
                        </li>
                    </ul>
                </div>

                <div className="details">
                    <div className="title">Payment Details</div>

                    <form className="form">
                        <div className='inputsCont'>
                            <input className='forms_bot_line | form-control' type="text" placeholder='Full Name'
                                name="fullName" onChange={formik.handleChange} value={formik.values.fullName} />

                            <label className='error'>{formik.errors.fullName ? formik.errors.fullName : ""}</label>
                        </div>

                        <div className='inputsCont'>
                            <input className='forms_bot_line | form-control' type="number" placeholder='Card Number' min='0'
                                name="cardNumber" onChange={formik.handleChange} value={formik.values.cardNumber} />

                            <label className='error'>{formik.errors.cardNumber ? formik.errors.cardNumber : ""}</label>
                        </div>

                        <div className='inputsCont twoInputs'>
                            <div className="left">
                                <div className="title">Expiration</div>
                                <input className='forms_bot_line | form-control' type="number" placeholder='mm   dd   yy' min='0'
                                    name="expiration" onChange={formik.handleChange} value={formik.values.expiration} />
                            </div>

                            <div className="right">
                                <div className="title">CVV</div>
                                <input className='forms_bot_line | form-control' type="number" placeholder='nnn' min='0'
                                    name="cvv" onChange={formik.handleChange} value={formik.values.cvv} />
                            </div>
                        </div>
                    </form>

                    <div className='payment-regulations'>
                        By clicking “Confirm Payment”, you agree to our store regulations.
                    </div>

                    <div className="btn-container">
                        <Link className='cancel-btn' to='/basket'>Cancel</Link>
                        <button className='confirm-btn mainButton' onClick={confirmPayment}>Confirm Payment</button>
                    </div>
                </div>

            </div>

            {/* right part */}
            <div className="payment__orderImg">
                <img className='img' src={testMotoImg} />
                <div className='order-details'>
                    <div className='title'>
                        Your order: <br />
                        Ducati 1199 Panigale (2012)
                    </div>
                    <div className='supTitle'>
                        And: 5 motorcycles
                    </div>
                    <div className='price'>
                        {clientStore.formatPrice(168468)}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Payment