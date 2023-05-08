import './paginationStyle.scss'

import newsStore from '../../store/newsStore'

const NewsPagination = ({ NewsPerPage, totalNews, paginate, nextPage, prevPage }) => {

    const pageNumbers = []
    for (let i = 0; i <= Math.ceil(totalNews / NewsPerPage); i++) {
        if (i !== 0) {
            pageNumbers.push(i)
        }
    }

    newsStore.setlengthPagNumber(pageNumbers.length)

    return (
        <div>
            <ul className='pagination w-100 d-flex justify-content-center my-3'>
                <li class="page-item"><a class="page-link"
                    onClick={prevPage}
                ><i className="bi bi-arrow-left-short"></i></a></li>
                {
                    pageNumbers.map((number) => (
                        <li className='page-item' key={number}>
                            <a
                                className={newsStore.activeLink == number ? 'page-link active' : 'page-link'}
                                onClick={() => paginate(number)}>{number}</a>
                        </li>
                    ))
                }
                <li class="page-item"><a class="page-link"
                    onClick={nextPage}
                ><i className="bi bi-arrow-right-short"></i></a></li>
            </ul>
        </div>
    )
}

export default NewsPagination