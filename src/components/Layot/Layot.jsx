import Footer from '../../components/Footer/Footer.jsx'
import Header from '../../components/Header/Header.jsx'

import { Outlet} from 'react-router-dom'

const Layot = () => {
    return (
        <div>
            <Header />
            <Outlet></Outlet>
            <Footer />
        </div>
    )
}

export default Layot