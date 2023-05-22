import { useEffect, useState } from 'react'
import './BackUpBtn.scss'

const BackUpBtn = ({ ...props }) => {

    const [scroll, setScroll] = useState(0);

    const handleScroll = () => {
        setScroll(window.scrollY);
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    function clickHandler() {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }

    return (
        <a onClick={clickHandler} >
            {
                props.debugLine == 'true' ?
                    <div className='for-dev' style={{ top: `${props.whenShow}px` }}></div>
                    : false
            }
            <button className={scroll > props.whenShow ? 'backUpbtn active' : 'backUpbtn'}>
                <i title='go top' className="bi bi-arrow-up-circle-fill"></i>
            </button>
        </a >
    )
}

export default BackUpBtn