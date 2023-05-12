import Footer from '../../components/Footer/Footer.jsx'
import Header from '../../components/Header/Header.jsx'

import { Outlet } from 'react-router-dom'

const Layot = () => {
    return (
        <div>
            <Header />
            <div style={{ paddingTop: "55px" }}>
                {/* якщо хедер позиціонується як fixed то усі елементи 
                які відштовхувались від нього стали ваще на восоту хедера */}
                <Outlet></Outlet>
            </div>

            <Footer />
        </div>
    )
}

export default Layot