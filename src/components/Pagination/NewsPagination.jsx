import React from 'react'
import newsStore from '../../store/newsStore'

const NewsPagination = ({ NewsPerPage, totalNews, paginate }) => {
    const pageNumbers = []

    for (let i = 0; i <= Math.ceil(totalNews / NewsPerPage); i++) {
        if(i !== 0){
            pageNumbers.push(i)
        }
    }

    newsStore.setlengthPagNumber(pageNumbers.length)
    return (
        <div>
            <ul className='pagination w-100 d-flex justify-content-center'>
                {
                    pageNumbers.map((number)=>(
                        <li className='page-item' key={number}>
                            <a className='page-link' onClick={() => paginate(number)}>{number}</a>
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}

export default NewsPagination