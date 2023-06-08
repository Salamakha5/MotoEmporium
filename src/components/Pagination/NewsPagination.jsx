
import './paginationStyle.scss'

import { observer } from 'mobx-react-lite'
import newsStore from '../../store/newsStore'

let s = newsStore
const NewsPagination = observer(({ shortPagination, dataLength }) => {

    const pageNumbers = []
    for (let i = 0; i <= Math.ceil(dataLength / s.newsObjectsPerPage); i++) {
        if (i !== 0) {
            pageNumbers.push(i)
        }
    }
    s.setNewsCountPages(pageNumbers.length)

    const paginate = pageNumber => {
        s.setNewsActivePage(pageNumber)
    }
    const nextPage = () => {
        if (s.newsActivePage < s.newsCountPages) {
            s.setNewsActivePage(s.newsActivePage + 1)
        } else if (s.newsActivePage >= s.newsCountPages) {
            s.setNewsActivePage(1)
        }
    }
    const prevPage = () => {
        if (s.newsActivePage > 1) {
            s.setNewsActivePage(s.newsActivePage - 1)
        } else if (s.newsActivePage <= 1) {
            s.setNewsActivePage(s.newsCountPages)
        }
    }

    return (
        <div className='py-5'>
            <ul className={shortPagination == true ? 'pagination pagination_short' : 'pagination'}>
                <li className="page-item"><a className="page-link" onClick={prevPage}><i className="bi bi-arrow-left-short"></i></a></li>
                {
                    pageNumbers.map((number) => (
                        <li className={s.newsActivePage == number ? 'page-item active' : 'page-item'} key={number}>
                            <a className={s.newsActivePage == number ? 'page-link active' : 'page-link'} onClick={() => paginate(number)}>{number}</a>
                        </li>
                    ))
                }
                <li className="page-item"><a className="page-link" onClick={nextPage}><i className="bi bi-arrow-right-short"></i></a></li>
            </ul>
        </div>
    )
})

export default NewsPagination