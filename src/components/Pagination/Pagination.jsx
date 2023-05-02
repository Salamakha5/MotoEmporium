import React from 'react'
import serverStore from '../../store/serverStore'

const Pagination = ({ MotoPerPage, totalMoto, paginate }) => {
    const pageNumbers = []

    for (let i = 0; i <= Math.ceil(totalMoto / MotoPerPage); i++) {
        if(i !== 0){
            pageNumbers.push(i)
        }
    }
    serverStore.setlengthPagNumber(pageNumbers.length)
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

export default Pagination