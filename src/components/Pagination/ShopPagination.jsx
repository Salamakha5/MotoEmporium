
import './paginationStyle.scss'

import { observer } from 'mobx-react-lite'
import serverStore from '../../store/serverStore'

let s = serverStore
const ShopPagination = observer(({ shortPagination, dataLength }) => {

    const pageNumbers = []
    for (let i = 0; i <= Math.ceil(dataLength / s.motoObjectsPerPage); i++) {
        if (i !== 0) {
            pageNumbers.push(i)
        }
    }
    s.setMotoCountPages(pageNumbers.length)

    const paginate = pageNumber => {
        s.setMotoActivePage(pageNumber)
    }
    const nextPage = () => {
        if (s.motoActivePage < s.motoCountPages) {
            s.setMotoActivePage(s.motoActivePage + 1)
        } else if (s.motoActivePage >= s.motoCountPages) {
            s.setMotoActivePage(1)
        }
    }
    const prevPage = () => {
        if (s.motoActivePage > 1) {
            s.setMotoActivePage(s.motoActivePage - 1)
        } else if (s.motoActivePage <= 1) {
            s.setMotoActivePage(s.motoCountPages)
        }
    }

    return (
        <div className='py-5'>
            <ul className={shortPagination == true ? 'pagination pagination_short' : 'pagination'}>
                <li className="page-item"><a className="page-link" onClick={prevPage}><i className="bi bi-arrow-left-short"></i></a></li>
                {
                    pageNumbers.map((number) => (
                        <li className={s.motoActivePage == number ? 'page-item active' : 'page-item'} key={number}>
                            <a className={s.motoActivePage == number ? 'page-link active' : 'page-link'} onClick={() => paginate(number)}>{number}</a>
                        </li>
                    ))
                }
                <li className="page-item"><a className="page-link" onClick={nextPage}><i className="bi bi-arrow-right-short"></i></a></li>
            </ul>
        </div>
    )
})

export default ShopPagination