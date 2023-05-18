import './paginationStyle.scss'

import newsStore from '../../store/newsStore'
import { useEffect } from 'react'

const NewsPagination = ({ NewsPerPage, totalNews, paginate, nextPage, prevPage }) => {

    let pageNumbers = []
    for (let i = 0; i <= Math.ceil(totalNews / NewsPerPage); i++) {
        if (i !== 0) {
            pageNumbers.push(i)
        }
    }
    newsStore.setlengthPagNumber(pageNumbers.length)


    return (
        <div>
            <ul className='pagination pagination_short w-100 d-flex justify-content-center my-3' id='pagination'>
                <li className="page-item"><a className="page-link"
                    onClick={prevPage}
                ><i className="bi bi-arrow-left-short"></i></a></li>
                {
                    pageNumbers.map((number) => (
                        <li className={newsStore.activeLink == number ? 'page-item active' : 'page-item'} key={number}>
                            <a
                                className={newsStore.activeLink == number ? 'page-link active' : 'page-link'}
                                onClick={() => paginate(number)}>{number}</a>
                        </li>
                    ))
                }
                <li className="page-item"><a className="page-link"
                    onClick={nextPage}
                ><i className="bi bi-arrow-right-short"></i></a></li>
            </ul>
        </div>
    )
}

export default NewsPagination