import './paginationStyle.scss'

import serverStore from '../../store/serverStore'
import { useEffect } from 'react'

const ShopPagination = ({ MotoPerPage, totalMoto, paginate, prevPage, nextPage }) => {
    const pageNumbers = []

    useEffect(() => {
        serverStore.setlengthPagNumber(pageNumbers.length)
    }, [])

    for (let i = 0; i <= Math.ceil(totalMoto / MotoPerPage); i++) {
        if (i !== 0) {
            pageNumbers.push(i)
        }
    }


    return (
        <div>
            <ul className='pagination w-100 d-flex justify-content-center'>
                <li className="page-item"><a className="page-link"
                    onClick={prevPage}
                ><i className="bi bi-arrow-left-short"></i></a></li>
                {
                    pageNumbers.map((number) => (
                        <li className='page-item' key={number}>
                            <a className={serverStore.activeLink == number ? 'page-link active' : 'page-link'} onClick={() => paginate(number)}>{number}</a>
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

export default ShopPagination