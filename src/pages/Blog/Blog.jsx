import './Blog.scss'

import React from 'react'
import { useEffect } from 'react'
import BlogItem from '../../components/BlogItem/BlogItem'

const Blog = () => {
    useEffect(() => {
        document.title = "Blog - MotoEmporium";
    }, [])

    return (
        <div className='blog | pt-5'>
            <div className="blog__container | container px-5">
                <div className="row pt-4 pb-5">
                    <div className="col-7"></div>
                    <div className="col-5">
                        <div className="row">
                            <div className="col">
                                <select className="form-select mt-3 mb-3 me-3" aria-label="Default select example">
                                    <option defaultValue>Найактуальніші</option>
                                    <option value="1">One</option>
                                    <option value="2">Two</option>
                                    <option value="3">Three</option>
                                </select>
                            </div>

                            <div className='col'>
                                <select className="form-select mt-3 mb-3" aria-label="Default select example">
                                    <option defaultValue>Сторінка 1</option>
                                    <option value="1">One</option>
                                    <option value="2">Two</option>
                                    <option value="3">Three</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="blog__items">
                    <BlogItem/>
                </div>
            </div>
        </div>
    )
}

export default Blog