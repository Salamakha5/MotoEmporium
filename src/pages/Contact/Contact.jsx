import "./Contact.scss";
import bgVideo from "../../images/videos/-33770.mp4";

import { useEffect } from 'react'

const Contact = () => {
    useEffect(() => {
        document.title = "Contact - MotoEmporium";
    }, [])

    return (
        <div className='contact | row' style={{ minHeight: "80vh" }}>
            <div className="col-6">
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d82352.49626466396!2d23.92983487341891!3d49.832770573623584!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x473add7c09109a57%3A0x4223c517012378e2!2z0JvRjNCy0ZbQsiwg0JvRjNCy0ZbQstGB0YzQutCwINC-0LHQu9Cw0YHRgtGMLCA3OTAwMA!5e0!3m2!1suk!2sua!4v1684264928220!5m2!1suk!2sua" width="100%" height="100%" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
            </div>
            <div className="right-part | col-6">

                <video className="bgVideo" src={bgVideo} autoPlay muted loop ></video>

                <div className="content">

                    <div className="title">Developers:</div>
                    
                    <div className="dev-item | row">

                        <div className="col-12"><i className="bi bi-terminal"></i>Roman Shavala</div>

                        <div className="btn-cont | col-12">
                            <a href="https://github.com/Romasta915" target="_blank">
                                <button className="github-btn btn">
                                    <i class="bi bi-github"></i>
                                    Github
                                </button></a>
    
                            <a href="https://github.com/Romasta915" target="_blank">
                                <button className="linckedin-btn btn">
                                    <i class="bi bi-linkedin"></i>
                                    Linkedin
                                </button></a>
                        </div>
                    </div>


                    <div className="dev-item | row">

                        <div className="col-12"><i className="bi bi-terminal"></i>Vladyslav Salamakha</div>

                        <div className="btn-cont | col-12">
                            <a href="https://github.com/Romasta915" target="_blank">
                                <button className="github-btn btn">
                                    <i class="bi bi-github"></i>
                                    Github
                                </button></a>
    
                            <a href="https://github.com/Romasta915" target="_blank">
                                <button className="linckedin-btn btn">
                                    <i class="bi bi-linkedin"></i>
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