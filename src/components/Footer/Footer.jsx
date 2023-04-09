import React from 'react'
import styles from './Footer.scss'

const Footer = () => {
    return (
        <div className='footer'>
            <div className='footer__nav'>
                <div className='footer__item'>
                    <ul>
                        <li className='footer__title'>two wheelers</li>
                        <li className='pb-3 small__lineHeigth'>2005 Broken Dream Blvd <br /> Daytona Beach, FL 32122</li>
                        <li><a className='main-link' href='tel:34375092453'>(343)-7509-2453</a></li>
                    </ul>
                </div>
                <div className='footer__item'>
                    <ul>
                        <li>New Inventory</li>
                        <li>Used Inventory</li>
                        <li>Service Center</li>
                        <li>Custom Parts</li>
                        <li>Riding Tips</li>
                    </ul>
                </div>
                <div className='footer__item'>
                    <ul>
                        <li>Test Ride</li>
                        <li>Finance</li>
                        <li>Our Blog</li>
                        <li>About Us</li>
                        <li>Media</li>
                    </ul>
                </div>
                <div className='footer__item'>
                    <ul>
                        <li className='footer__title'>STORE HOURS</li>
                        <li>Weekdays: 8 AM - 3 PM</li>
                        <li>Saturday: 8 AM - 2 PM</li>
                        <li>Sunday/National Holiday: Closed</li>
                    </ul>
                </div>
            </div>
            <div className="footer__copyright">
                <div className='text'>©2021 TwoWheelers.com. All rights reserved

                    <div className="socials">
                        <div className="socials__item"><i className="bi bi-facebook"></i></div>
                        <div className="socials__item"><i className="bi bi-instagram"></i></div>
                        <div className="socials__item"><i className="bi bi-linkedin"></i></div>
                        <div className="socials__item"><i className="bi bi-youtube"></i></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer