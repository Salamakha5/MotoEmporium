import './Blog.scss'

import React, { createRef, useRef, useState } from 'react'
import { useEffect } from 'react'
import BlogItem from '../../components/BlogItem/BlogItem'
import { observer } from 'mobx-react-lite'
import newsStore from '../../store/newsStore'
import NewsPagination from '../../components/Pagination/NewsPagination'
import { useTranslation } from 'react-i18next'

const Blog = observer(() => {

    useEffect(() => {
        newsStore.getAllNews()
        setLoading(false)
        document.title = "Blog - MotoEmporium";
        // ! при переході на інший роут в нас скидаються елементи пагінації, цей рядок для скидання стилів 
        newsStore.setActiveLink(1)
    }, [])

    const { t } = useTranslation();

    let selectSort = createRef()

    function sortNews() {
        newsStore.sortNews(selectSort.current.value)
    }

    // pagination
    const [Loading, setLoading] = useState(false)
    const [currentPage, setcurrentPage] = useState(1)
    const [NewsPerPage] = useState(3)

    const lastNewsIndex = currentPage * NewsPerPage
    const firstNewsIndex = lastNewsIndex - NewsPerPage
    const currentNews = newsStore.newsData.slice(firstNewsIndex, lastNewsIndex)
    const paginate = (pageNumber) => {
        setcurrentPage(pageNumber)
        newsStore.setActiveLink(pageNumber)
    }
    const nextPage = () => {
        if (currentPage < newsStore.lengthPageNumber) {
            setcurrentPage(currentPage + 1)
            newsStore.setActiveLink(newsStore.activeLink + 1)
        }
    }
    const prevPage = () => {
        if (currentPage > 1) {
            setcurrentPage(currentPage - 1)
            newsStore.setActiveLink(newsStore.activeLink - 1)
        }
    }

    return (
        <div className='blog | pt-5'>
            <div className="blog__container | container px-5">
                <div className="row pt-4">
                    <div className="col-7"></div>
                    <div className="col-5">
                        <div className="row">
                            <div className="col">
                                <select ref={selectSort} onChange={sortNews} className="form-select mt-3 mb-3 me-3" aria-label="Default select example">
                                    <option value={"new"}>{t('blog_page.selectSort-new')}</option>
                                    <option value={"old"}>{t('blog_page.selectSort-old')}</option>
                                </select>
                            </div>

                        </div>
                    </div>
                </div>
                <div className="blog__items">
                    {
                        currentNews.map((p) => {
                            return <BlogItem key={p._id} data={p}></BlogItem>
                        })
                    }
                </div>

                <div className='d-flex justify-content-center align-items-center'>
                    <NewsPagination
                        NewsPerPage={NewsPerPage}
                        totalNews={newsStore.newsData.length}
                        paginate={paginate}
                        nextPage={nextPage}
                        prevPage={prevPage}
                    ></NewsPagination>
                </div>
            </div>
        </div>
    )
})

export default Blog