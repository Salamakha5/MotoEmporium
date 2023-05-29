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
            // console.log(toJS(basketStore.BasketData));
            setShowPageLoader(false)
        })
    }, [])

    const contactformik = useFormik({
        initialValues: {
            // phoneNumber: ,
        },
        validationSchema: Yup.object({
            fullName: Yup.string().required(t('yupErrors.required'))
                .min(4, t('yupErrors.valid-field', { num: 4 })).max(50, t('yupErrors.valid-maxLength', { num: 50 })),
            phoneNumber: Yup.string().required(t('yupErrors.required'))
                .min(10, t('yupErrors.valid-field', { num: 10 })).max(15, t('yupErrors.valid-maxLength', { num: 15 })),
            city: Yup.string().required(t('yupErrors.required'))
                .min(4, t('yupErrors.valid-field', { num: 4 })).max(50, t('yupErrors.valid-maxLength', { num: 50 })),
            departament: Yup.string().required(t('yupErrors.required'))
                .min(4, t('yupErrors.valid-field', { num: 4 })).max(50, t('yupErrors.valid-maxLength', { num: 50 })),
        })
    })
    const cardformik = useFormik({
        initialValues: {
            // cardNumber: '',
        },
        validationSchema: Yup.object({
            cardNumber: Yup.string().required(t('yupErrors.required'))
                .min(12, t('yupErrors.valid-cardNumber')).max(12, t('yupErrors.valid-maxLength', { num: 12 })),
            expirationMM: Yup.string().required(t('yupErrors.required'))
                .min(2, t('yupErrors.valid-field', { num: 2 })).max(2, t('yupErrors.valid-maxLength', { num: 2 })),
            expirationYY: Yup.string().required(t('yupErrors.required'))
                .min(2, t('yupErrors.valid-field', { num: 2 })).max(2, t('yupErrors.valid-maxLength', { num: 2 })),
            cvv: Yup.string().required(t('yupErrors.required'))
                .min(3, t('yupErrors.valid-field', { num: 3 })).max(3, t('yupErrors.valid-maxLength', { num: 3 })),
        })
    })

    const [paymentMethod, setPaymentMethod] = useState('credit card')
    function methodHandler(e) { setPaymentMethod(e.target.value) }

    let orderNamesSemicolon = 'And '
    let i = 1
    toJS(basketStore.BasketData).slice(1).forEach(element => {
        i++
        orderNamesSemicolon += `${i}.${element.brand} - ${element.model} x${element.current}; `
    })

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
            toJS(basketStore.BasketData).forEach(e => orderNamesBr += `</br>${e.brand} - ${e.model} x${e.current}`)

            alertify.alert('Успіх', `
            <div class='d-flex justify-content-center'><img src=${smileFace} alt='smile face' /></div>
            </br> <span class='fs-5 fw-bold'>Контакти замовника:</span>
            </br>Ім'я: ${fullName} 
            </br> Номер телефону: ${phoneNumber}
            </br>Місто: ${city}
            </br>Відділення: ${departament}
            </br>Спосіб оплати: ${paymentMethod} 
            </br>Номер картки: ${cardNumber} 
            </br>Темін дії: ${expirationMM} / ${expirationYY} | cvv: ${cvv} 
            </br> </br>
            </br> <span class='fs-5 fw-bold'>Інформація про замовлення:</span>
            ${orderNamesBr}`,
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
                        <div className="title">{t('payment_page.contactDetails.title')}</div>

                        <form className="form">

                            {/* contact details */}
                            <div className='contact-details'>
                                <div className='inputsCont'>
                                    <input className='forms_bot_line | form-control' type="text" placeholder={t('payment_page.contactDetails.full_name')}
                                        name="fullName" onChange={contactformik.handleChange} value={contactformik.values.fullName} />

                                    <div className='error-string'>{contactformik.errors.fullName ? contactformik.errors.fullName : ""}</div>
                                </div>

                                <div className='inputsCont'>
                                    <input className='forms_bot_line | form-control' type="number" placeholder={t('payment_page.contactDetails.number_phone')}
                                        name="phoneNumber" onChange={contactformik.handleChange} value={contactformik.values.phoneNumber} />

                                    <div className='error-string'>{contactformik.errors.phoneNumber ? contactformik.errors.phoneNumber : ""}</div>
                                </div>

                                <div className='inputsCont'>
                                    <input className='forms_bot_line | form-control' type="text" placeholder={t('payment_page.contactDetails.city')}
                                        name="city" onChange={contactformik.handleChange} value={contactformik.values.city} />

                                    <div className='error-string'>{contactformik.errors.city ? contactformik.errors.city : ""}</div>
                                </div>

                                <div className='inputsCont'>
                                    <input className='forms_bot_line | form-control' type="text" placeholder={t('payment_page.contactDetails.department')}
                                        name="departament" onChange={contactformik.handleChange} value={contactformik.values.departament} />

                                    <div className='error-string'>{contactformik.errors.departament ? contactformik.errors.departament : ""}</div>
                                </div>
                            </div>

                            {/* card data */}
                            <div className='method'>
                                <div className='title'>{t('payment_page.cardDetails.method-title')}</div>

                                <ul className='method__ul'>
                                    <li>
                                        <input className='custom-radio' type="radio" name='paymentMethod' id='creditCard' defaultChecked
                                            value='credit cart' onChange={methodHandler} />
                                        <label htmlFor='creditCard'><span>{t('payment_page.cardDetails.method-credit_card')}</span></label>
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
                                    <input className='forms_bot_line | form-control' type="number" placeholder={t('payment_page.cardDetails.card_number')}
                                        name="cardNumber" value={cardformik.values.cardNumber}
                                        onChange={cardformik.handleChange} />

                                    <div className='error-string'>{cardformik.errors.cardNumber ? cardformik.errors.cardNumber : ""}</div>
                                </div>

                                <div className='inputsCont twoInputs'>
                                    <div className="left">
                                        <div className="title">{t('payment_page.cardDetails.expiration-title')}</div>

                                        <div className='inputs-cont'>
                                            <input type="number" placeholder={t('payment_page.cardDetails.expiration-mm')} name="expirationMM"
                                                className={cardformik.errors.expirationMM
                                                    ? 'forms_bot_line input-mm | form-control invalid'
                                                    : 'forms_bot_line input-mm | form-control valid'}
                                                onChange={cardformik.handleChange} value={cardformik.values.expirationMM}
                                            />

                                            <input type="number" placeholder={t('payment_page.cardDetails.expiration-yy')}
                                                className={cardformik.errors.expirationYY
                                                    ? 'forms_bot_line input-yy | form-control invalid'
                                                    : 'forms_bot_line input-yy | form-control valid'}
                                                name="expirationYY" onChange={cardformik.handleChange} value={cardformik.values.expirationYY} />
                                        </div>
                                    </div>

                                    <div className="right">
                                        <div className="title">CVV</div>
                                        <input type="number" placeholder='nnn'
                                            className={cardformik.errors.cvv
                                                ? 'forms_bot_line | form-control invalid'
                                                : 'forms_bot_line | form-control valid'}
                                            name="cvv" value={cardformik.values.cvv}
                                            onChange={cardformik.handleChange} />
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
                                            {t('payment_page.preorderDetails.title')} <br />
                                            {toJS(basketStore.BasketData)[0].brand} - {toJS(basketStore.BasketData)[0].model}  x{toJS(basketStore.BasketData)[0].current}
                                        </div>
                                        <div className='supTitle'>
                                            {
                                                toJS(basketStore.BasketData).length > 8 ?
                                                    <span> {t('payment_page.preorderDetails.suptitle', { num: toJS(basketStore.BasketData).length - 1 })} </span>
                                                    :
                                                    orderNamesSemicolon
                                            }
                                        </div>
                                        <div className='price'>
                                            {clientStore.formatPrice(basketStore.AllPriceMoto - (basketStore.AllPriceMoto / 100 * discount))}
                                        </div>
                                    </div>
                                </>
                                : <div style={{ height: "60%" }} className='d-flex justify-content-center align-items-center'>
                                    <div className="loader active" id="loader-2">
                                        <span></span>
                                        <span></span>
                                        <span></span>
                                    </div>
                                </div>
                        }
                    </div>

                    <div className='payment-regulations'>{t('payment_page.preorderDetails.payment_regulations')}</div>

                    <div className="btn-container">
                        <Link className='cancel-btn' to='/basket'>{t('payment_page.preorderDetails.btn-cancel')}</Link>
                        <button className={(cardformik.isValid && cardformik.dirty) && (contactformik.isValid && contactformik.dirty)
                            ? 'confirm-btn mainButton' : 'confirm-btn mainButton | btn disabled'}
                            onClick={confirmPayment}>{t('payment_page.preorderDetails.btn-confirm')}</button>
                    </div>
                </div>

            </div >
        </>
    )
}

export default Payment