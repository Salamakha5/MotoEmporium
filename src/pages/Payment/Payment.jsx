import './Payment.scss'

import payPalImg from '../../images/icons/paypal.png'
import applePayImg from '../../images/icons/applepay.png'
import testMotoImg from '../../images/logReg_bg.png'

import clientS from '../../store/clientStore';
import { NavLink } from 'react-router-dom'
import { useNavigate } from "react-router-dom"
import { useEffect } from 'react';

const Payment = () => {

    const navigate = useNavigate()

    useEffect(() => {
        document.title =  'Payment | MotoEmporium'
    })

    function confirmPayment() {
        alert('da da ya')
    }

    return (
        <div className='payment'>
            <div className="payment__datails">

                <div className='method'>
                    <div className='title'>Payment Method</div>
                    <ul className='method__ul'>
                        <li>
                            <input type="radio" name='paymentMethod' id='creditCard' />
                            <label htmlFor='creditCard'>Credit Card</label>
                        </li>
                        <li>
                            <input type="radio" name='paymentMethod' id='payPal' />
                            <label htmlFor='payPal'>
                                <img src={payPalImg} alt="PayPal" />
                            </label>
                        </li>
                        <li>
                            <input type="radio" name='paymentMethod' id='applePay' />
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
                            <input className='forms_bot_line' type="text" placeholder='Full Name' />
                        </div>
                        <div className='inputsCont'>
                            <input className='forms_bot_line' type="number" placeholder='Number' />
                        </div>
                        <div className='inputsCont twoInputs'>
                            <div className="left">
                                <div className="title">Expiration</div>
                                <input className='forms_bot_line' type="number" placeholder='Number' />
                            </div>
                            <div className="right">
                                <div className="title">CVV</div>
                                <input className='forms_bot_line' type="number" placeholder='Number' />
                            </div>
                        </div>
                    </form>

                    <div className='payment-regulations'>
                        By clicking “Confirm Payment”, you agree to our store regulations.
                    </div>

                    <div className="btn-container">
                        <NavLink className='cancel-btn'>Cancel</NavLink>
                        <button className='confirm-btn' onClick={confirmPayment}>Confirm Payment</button>
                    </div>
                </div>

            </div>

            {/* right part */}
            <div className="payment__orderImg">
                <img className='order__img' src={testMotoImg} />
                <div className='order-details'>
                    <div className='title'>
                        Your order: <br />
                        Ducati 1199 Panigale (2012)
                    </div>
                    <div className='supTitle'>
                        Color: S Tricolore (12DU1199PSTRIU)
                    </div>
                    <div className='price'>
                        {clientS.formatPrice(168468)}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Payment