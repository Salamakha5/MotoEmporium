import './Payment.scss'

import payPalImg from '../../images/icons/pay_pal.png'
import googlePayImg from '../../images/icons/google_pay.png'
import smileFace from '../../images/icons/smile_face.png'

import clientStore from '../../store/clientStore';
import serverStore from '../../store/serverStore';
import basketStore from '../../store/basketStore';
import { Link } from 'react-router-dom'
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from 'react';
import { toJS } from "mobx"
import { useFormik } from "formik";
import * as Yup from "yup"
import { useTranslation } from 'react-i18next';
import alertify from 'alertifyjs'

const Payment = () => {

    const navigate = useNavigate()
    const { t } = useTranslation();
    let discount = 20
    const [showPageLoader, setShowPageLoader] = useState(false)


    useEffect(() => {
        document.title = 'Payment | MotoEmporium'
        setShowPageLoader(true)

        serverStore.getAllMoto(() => {
            basketStore.getBasketMoto()
            console.log(toJS(basketStore.BasketData));
            setShowPageLoader(false)
        })
    }, [])

    const contactformik = useFormik({
        initialValues: {
            // phoneNumber: ,
        },
        validationSchema: Yup.object({
            fullName: Yup.string().required(t('yupErrors.required')).min(4, t('yupErrors.valid-field', { num: 4 })).max(20, t('yupErrors.valid-maxLength', { num: 20 })),
            phoneNumber: Yup.string().required(t('yupErrors.required')).min(10, t('yupErrors.valid-field', { num: 10 })).max(15, t('yupErrors.valid-maxLength', { num: 15 })),
            city: Yup.string().required(t('yupErrors.required')).min(4, t('yupErrors.valid-field', { num: 4 })).max(20, t('yupErrors.valid-maxLength', { num: 20 })),
            departament: Yup.string().required(t('yupErrors.required')).min(4, t('yupErrors.valid-field', { num: 4 })).max(20, t('yupErrors.valid-maxLength', { num: 20 })),
        })
    })

    const cardformik = useFormik({
        initialValues: {
            // cardNumber: '',
        },
        validationSchema: Yup.object({
            cardNumber: Yup.string().required(t('yupErrors.required')).min(12, t('yupErrors.valid-cardNumber')).max(12, t('yupErrors.valid-maxLength', { num: 12 })),
            expirationMM: Yup.string().required(t('yupErrors.required')).min(2, t('yupErrors.valid-field', { num: 2 })).max(2, t('yupErrors.valid-maxLength', { num: 2 })),
            expirationYY: Yup.string().required(t('yupErrors.required')).min(2, t('yupErrors.valid-field', { num: 2 })).max(2, t('yupErrors.valid-maxLength', { num: 2 })),
            cvv: Yup.string().required(t('yupErrors.required')).min(3, t('yupErrors.valid-field', { num: 3 })).max(3, t('yupErrors.valid-maxLength', { num: 3 })),
        })
    })

    const [paymentMethod, setPaymentMethod] = useState('credit card')
    function methodHandler(e) { setPaymentMethod(e.target.value) }


    let orderNamesSemicolon = ''
    toJS(basketStore.BasketData).forEach(element => orderNamesSemicolon += `${element.brand} - ${element.model}; `)

    function confirmPayment() {
        const { fullName, phoneNumber, city, departament } = contactformik.values
        const { cardNumber, expirationMM, expirationYY, cvv } = cardformik.values

        if ((cardformik.isValid && cardformik.dirty) && (contactformik.isValid && contactformik.dirty)) {

            // тут по ідеї має даватись запит до платіжної системи 
            // і якщо все добре то виконується наступний код
            // if (pay == succes) {

            // тут до БД надходить інформація про замовлення

            // alertify.alert('Успіх', `<img src=${smileFace}>`, function () { alertify.success('navigate(/)'); });

            let orderNamesBr = ''
            toJS(basketStore.BasketData).forEach(element => orderNamesBr += `</br>${element.brand} - ${element.model}`)

            alertify.alert('Успіх', `Ім'я: ${fullName} </br> Номер телефону: ${phoneNumber} </br> Місто: ${city} </br>
                Відділення: ${departament} </br> Спосіб оплати: ${paymentMethod} </br> Номер картки: ${cardNumber} </br>
                Темін дії: ${expirationMM} / ${expirationYY} | cvv: ${cvv} </br> </br> </br>
                Ваше замовлення: ${orderNamesBr}`,
                function () { alertify.success('navigate(/)'); });

            // } else {
            //          alert('not have money' or 'something else')
            // }

        } else {
            alert('something is wrong')
        }

    }

    return (
        <>
            <div className={showPageLoader == true ? 'loader-pageWrap active' : 'loader-pageWrap'}>
                <div className="loader active" id="loader-2">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
            <div className='payment'>

                <div className="order__details">

                    <div className="details">
                        <div className="title">Order Details</div>

                        <form className="form">

                            {/* contact details */}
                            <div className='contact-details'>
                                <div className='inputsCont'>
                                    <input className='forms_bot_line | form-control' type="text" placeholder='Full Name'
                                        name="fullName" onChange={contactformik.handleChange} value={contactformik.values.fullName} />

                                    <div className='error-string'>{contactformik.errors.fullName ? contactformik.errors.fullName : ""}</div>
                                </div>

                                <div className='inputsCont'>
                                    <input className='forms_bot_line | form-control' type="number" placeholder='Number phone'
                                        name="phoneNumber" onChange={contactformik.handleChange} value={contactformik.values.phoneNumber} />

                                    <div className='error-string'>{contactformik.errors.phoneNumber ? contactformik.errors.phoneNumber : ""}</div>
                                </div>

                                <div className='inputsCont'>
                                    <input className='forms_bot_line | form-control' type="text" placeholder='City'
                                        name="city" onChange={contactformik.handleChange} value={contactformik.values.city} />

                                    <div className='error-string'>{contactformik.errors.city ? contactformik.errors.city : ""}</div>
                                </div>

                                <div className='inputsCont'>
                                    <input className='forms_bot_line | form-control' type="text" placeholder='Department'
                                        name="departament" onChange={contactformik.handleChange} value={contactformik.values.departament} />

                                    <div className='error-string'>{contactformik.errors.departament ? contactformik.errors.departament : ""}</div>
                                </div>
                            </div>

                            {/* card data */}
                            <div className='method'>
                                <div className='title'>Payment details</div>

                                <ul className='method__ul'>
                                    <li>
                                        <input className='custom-radio' type="radio" name='paymentMethod' id='creditCard' defaultChecked
                                            value='credit cart' onChange={methodHandler} />
                                        <label htmlFor='creditCard'><span>Credit Card</span></label>
                                    </li>
                                    <li>
                                        <input className='custom-radio' type="radio" name='paymentMethod' id='payPal'
                                            value='pay pal' onChange={methodHandler} />
                                        <label htmlFor='payPal'>
                                            <img src={payPalImg} alt="PayPal" />
                                        </label>
                                    </li>
                                    <li>
                                        <input className='custom-radio' type="radio" name='paymentMethod' id='googlePay'
                                            value='google pay' onChange={methodHandler} />
                                        <label htmlFor='googlePay'>
                                            <img src={googlePayImg} alt="Google Pay" />
                                        </label>
                                    </li>
                                </ul>
                            </div>

                            <div className='card-data'>
                                <div className='inputsCont'>
                                    <input className='forms_bot_line | form-control' type="number" placeholder='Card Number'
                                        name="cardNumber" onChange={cardformik.handleChange} value={cardformik.values.cardNumber} />

                                    <div className='error-string'>{cardformik.errors.cardNumber ? cardformik.errors.cardNumber : ""}</div>
                                </div>

                                <div className='inputsCont twoInputs'>
                                    <div className="left">
                                        <div className="title">Expiration</div>

                                        <div className='inputs-cont'>
                                            <input type="number" placeholder='MM' name="expirationMM"
                                                onBlur={cardformik.handleBlur}
                                                className={cardformik.errors.expirationMM
                                                    ? 'forms_bot_line input-mm | form-control invalid'
                                                    : 'forms_bot_line input-mm | form-control valid'}
                                                onChange={cardformik.handleChange} value={cardformik.values.expirationMM}
                                            />

                                            <input type="number" placeholder='YY'
                                                className={cardformik.errors.expirationYY
                                                    ? 'forms_bot_line input-yy | form-control invalid'
                                                    : 'forms_bot_line input-yy | form-control valid'}
                                                name="expirationYY" onChange={cardformik.handleChange} value={cardformik.values.expirationYY} />
                                        </div>
                                    </div>

                                    <div className="right">
                                        <div className="title">CVV</div>
                                        <input type="number" placeholder='nnn' maxLength="3"
                                            className={cardformik.errors.cvv
                                                ? 'forms_bot_line | form-control invalid'
                                                : 'forms_bot_line | form-control valid'}
                                            name="cvv" onChange={cardformik.handleChange} value={cardformik.values.cvv} />
                                    </div>
                                </div>
                            </div>
                        </form>

                    </div>

                </div>

                {/* right part */}
                <div className="payment__orderImg">
                    <div className='preorder-details'>
                        {
                            toJS(basketStore.BasketData).length > 0 ?
                                <>
                                    <img className='img' src={toJS(basketStore.BasketData)[0].imgURL[0]} />
                                    <div className='text-info'>
                                        <div className='title'>
                                            Your order: <br />
                                            {toJS(basketStore.BasketData)[0].brand} - {toJS(basketStore.BasketData)[0].model}
                                        </div>
                                        <div className='supTitle'>
                                            {
                                                toJS(basketStore.BasketData).length > 4 ?
                                                    <span> And {toJS(basketStore.BasketData).length - 1} motorcycles </span>
                                                    :
                                                    orderNamesSemicolon
                                            }
                                        </div>
                                        <div className='price'>
                                            {clientStore.formatPrice(basketStore.AllPriceMoto - (basketStore.AllPriceMoto / 100 * discount))}
                                        </div>
                                    </div>
                                </>
                                : <div className='d-flex justify-content-center align-items-center'>
                                    <div className="loader active" id="loader-2">
                                        <span></span>
                                        <span></span>
                                        <span></span>
                                    </div>
                                </div>
                        }
                    </div>

                    <div className='payment-regulations'>By clicking “Confirm Payment”, you agree to our store regulations.</div>

                    <div className="btn-container">
                        <Link className='cancel-btn' to='/basket'>Cancel</Link>
                        <button className={(cardformik.isValid && cardformik.dirty) && (contactformik.isValid && contactformik.dirty)
                            ? 'confirm-btn mainButton' : 'confirm-btn mainButton | btn disabled'}
                            onClick={confirmPayment}>Confirm Payment</button>
                    </div>
                </div>

            </div >
        </>
    )
}

export default Payment