import './paginationStyle.scss'

import { observer } from 'mobx-react-lite'
import adminStore from '../../store/adminStore'

let s = adminStore
const PatternPagination = observer(({ shortPagination, dataLength }) => {

    const pageNumbers = []
    for (let i = 0; i <= Math.ceil(dataLength / s.productsObjectsPerPage); i++) {
        if (i !== 0) {
            pageNumbers.push(i)
        }
    }
    s.setProductsCountPages(pageNumbers.length)

    const paginate = pageNumber => {
        s.setProductsActivePage(pageNumber)
    }
    const nextPage = () => {
        if (s.productsActivePage < s.productsCountPages) {
            s.setProductsActivePage(s.productsActivePage + 1)
        } else if (s.productsActivePage >= s.productsCountPages) {
            s.setProductsActivePage(1)
        }
    }
    const prevPage = () => {
        if (s.productsActivePage > 1) {
            s.setProductsActivePage(s.productsActivePage - 1)
        } else if (s.productsActivePage <= 1) {
            s.setProductsActivePage(s.productsCountPages)
        }
    }

    return (
        <div>
            <ul className={shortPagination == true ? 'pagination pagination_short' : 'pagination'}>
                <li className="page-item"><a className="page-link" onClick={prevPage}><i className="bi bi-arrow-left-short"></i></a></li>
                {
                    pageNumbers.map((number) => (
                        <li className={s.productsActivePage == number ? 'page-item active' : 'page-item'} key={number}>
                            <a className={s.productsActivePage == number ? 'page-link active' : 'page-link'} onClick={() => paginate(number)}>{number}</a>
                        </li>
                    ))
                }
                <li className="page-item"><a className="page-link" onClick={nextPage}><i className="bi bi-arrow-right-short"></i></a></li>
            </ul>
        </div>
    )
})

export default PatternPagination