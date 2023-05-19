import { useEffect, useRef, useState } from 'react'
import './BackUpBtn.scss'

const BackUpBtn = () => {

    const btn = useRef()

    useEffect(() => {

        function handleResize() {
            // console.log(window.scrollY);
            // console.log(btn);

            // if (window.scrollY <= window.scrollY - 500) {
            //     console.log('hi');
            // }
            // console.log(btn.current.className);

            // console.log(
            //     // document.documentElement.clientHeight
            //     document.documentElement.scrollHeight
            // );


        }

        // window.addEventListener('scroll', handleResize)

        // return _ => {
        //     window.removeEventListener('scroll', handleResize)
        // }
    })

    function clickHandler() {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }

    return (

        <a className='a' onClick={clickHandler} ref={btn}>
            <button className='backUpbtn'>
                <i title='go top' className="bi bi-arrow-up-circle-fill"></i>
            </button>
        </a>
    )
}

export default BackUpBtn