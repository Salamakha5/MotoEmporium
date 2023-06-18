import "./Contact.scss";

import StarCanvas from "../../components/StarCanvas/StarCanvas.jsx";
import { useEffect } from 'react'

const Contact = () => {
    useEffect(() => {
        document.title = "Contact | MotoEmporium";
    }, [])

    return (
        <div className='contact | row' style={{ minHeight: "80vh" }}>
            <div className="map-container | order-2 order-md-1 col-sm-12 col-md-6">
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2572.9203264476982!2d24.02159911428419!3d49.843954549258804!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x473add73a0e035cd%3A0x400ecc961b15786c!2z0LLRg9C70LjRhtGPINCT0L7RgNC-0LTQvtGG0YzQutCwLCAxMCwg0JvRjNCy0ZbQsiwg0JvRjNCy0ZbQstGB0YzQutCwINC-0LHQu9Cw0YHRgtGMLCA3OTAwMA!5e0!3m2!1suk!2sua!4v1684317208050!5m2!1suk!2sua" width="100%" height="100%" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
            </div>
            <div className="right-part | order-1 order-md-2 col-sm-12 col-md-6">

                <StarCanvas setWidth='100%' setHeight='80vh'></StarCanvas>

                <div className="content">

                    <div className="title">Developers:</div>

                    <div className="dev-item">

                        <div><i className="bi bi-terminal"></i>Roman Shavala</div>
                        <div className="email_dev || m-1 ms-0 fs-5 d-flex">
                        <i className="bi bi-envelope-at"></i>    
                            romastal915@gmail.com</div>

                        <div className="btn-cont">
                            <a href="https://github.com/Romasta915" target="_blank">
                                <button className="github-btn btn">
                                    <i className="bi bi-github"></i>
                                    Github
                                </button></a>

                            <a href="https://www.linkedin.com/in/roman-shavala-346899268/" target="_blank">
                                <button className="linckedin-btn btn">
                                    <i className="bi bi-linkedin"></i>
                                    Linkedin
                                </button></a>
                        </div>
                    </div>

                    <div className="dev-item">

                        <div><i className="bi bi-terminal"></i>Vladyslav Salamakha</div>
                        <div className=" email_dev || m-1 ms-0 d-flex">
                        <i className="bi bi-envelope-at"></i>
                            vladyslavsalamakhapr@gmail.com
                            </div>

                        <div className="btn-cont">
                            <a href="https://github.com/Salamakha5" target="_blank">
                                <button className="github-btn btn">
                                    <i className="bi bi-github"></i>
                                    Github
                                </button></a>

                            <a href="https://www.linkedin.com/in/vladyslav-salamakha-6b0457253" target="_blank">
                                <button className="linckedin-btn btn">
                                    <i className="bi bi-linkedin"></i>
                                    Linkedin
                                </button></a>
                        </div>
                    </div>

                </div>


            </div>
        </div>
    )
}

export default Contact