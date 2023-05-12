import './Blog.scss'

import React, { createRef, useRef, useState } from 'react'
import { useEffect } from 'react'
import BlogItem from '../../components/BlogItem/BlogItem'
import { observer } from 'mobx-react-lite'
import newsStore from '../../store/newsStore'
import NewsPagination from '../../components/Pagination/NewsPagination'
import { useTranslation } from 'react-i18next'

const Blog = observer(() => {
    const [showPageLoader, setShowPageLoader] = useState(false)
    const [currentPage, setcurrentPage] = useState(1)
    const [NewsPerPage] = useState(3)

    const lastNewsIndex = currentPage * NewsPerPage
    const firstNewsIndex = lastNewsIndex - NewsPerPage
    const currentNews = newsStore.newsData.slice(firstNewsIndex, lastNewsIndex)
    const paginate = (pageNumber) => {
        setcurrentPage(pageNumber)
        newsStore.setActiveLink(pageNumber)
    }
    const { t } = useTranslation();

    useEffect(() => {
        setShowPageLoader(true)
        console.log(showPageLoader);
        newsStore.getAllNews(() => {
            setShowPageLoader(false)
            console.log(showPageLoader);
        })
        document.title = "Blog - MotoEmporium";
    }, [])
    let selectSort = createRef()
    let selectSortStatus = createRef()

    function sortNews() {
        if (selectSort.current.value == "new") {
            newsStore.newsData.sort((a, b) => (+b.indexData) - (+a.indexData))
        }
        if (selectSort.current.value == "old") {
            newsStore.newsData.sort((a, b) => (+a.indexData) - (+b.indexData))
        }
        if (selectSortStatus.current.value == "maxStatus") {
            newsStore.newsData.sort((a, b) => b.status - a.status)
        }
        if (selectSortStatus.current.value == "minStatus") {
            newsStore.newsData.sort((a, b) => a.status - b.status)
        }
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
                                    <option value="default">{t('blog_page.selectDate-dafault')}</option>
                                    <option value={"new"}>{t('blog_page.selectDate-new')}</option>
                                    <option value={"old"}>{t('blog_page.selectDate-old')}</option>
                                </select>
                            </div>
                            <div className="col">
                                <select ref={selectSortStatus} onChange={sortNews} className="form-select mt-3 mb-3 me-3" aria-label="Default select example">
                                    <option value="default">{t('blog_page.selectRating-dafault')}</option>
                                    <option value={"maxStatus"}>{t('blog_page.selectRating-mostPopular')}</option>
                                    <option value={"minStatus"}>{t('blog_page.selectRating-lessPopular')}</option>
                                </select>
                            </div>

                        </div>
                    </div>
                </div>
                <div className="blog__items">
                    <div className={showPageLoader === true ? 'd-flex justify-content-center my-5' : 'd-none'}>
                        <div className="loader active" id="loader-2">
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                    </div>
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
        </div >
    )
})

export default Blog