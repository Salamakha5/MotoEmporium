import './Blog.scss'

import BackUpBtn from '../../components/BackUpBtn/BackUpBtn'
import NewsPagination from '../../components/Pagination/NewsPagination'
import BlogItem from '../../components/BlogItem/BlogItem'
import newsStore from '../../store/newsStore'

import { createRef, useState } from 'react'
import { useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import { useTranslation } from 'react-i18next'
import { toJS } from 'mobx'

const Blog = observer(() => {

    const { t } = useTranslation();

    useEffect(() => {
        document.title = "Blog | MotoEmporium";

        setShowPageLoader(true)
        newsStore.getAllNews(() => {
            setShowPageLoader(false)
        })
    }, [])

    const [showPageLoader, setShowPageLoader] = useState(false)
    let selectSort = createRef()

    function sortNews() {
        if (selectSort.current.value == "new") {
            for (let i = 0; i < newsStore.newsData.length; i++) {
                const [day, month, year] = newsStore.newsData[i].data.split('.');
                newsStore.newsData[i].date = new Date(`${year}-${month}-${day}`);
            }
            newsStore.newsData = newsStore.newsData.sort((a, b) => b.date - a.date);
        }
        if (selectSort.current.value == "maxStatus") {
            newsStore.newsData.sort((a, b) => (+b.status) - (+a.status))
        }
    }

    // news pagination
    const lastNewsIndex = newsStore.newsActivePage * newsStore.newsObjectsPerPage
    const firstNewsIndex = lastNewsIndex - newsStore.newsObjectsPerPage
    const currentNews = newsStore.newsData.slice(firstNewsIndex, lastNewsIndex)

    return (
        <div className='blog | pt-5'>
            <BackUpBtn whenShow='750' debugLine='false'></BackUpBtn>

            <div className="blog__container | container px-5">
                <div className="row pt-4 d-flex justify-content-space-between">
                    <div className="col-12 col-sm-12 col-md-9 col-lg-9 d-flex align-items-center fs-5">{t('shop_page.sup-controls.isDisplayed',
                        { currentPage: newsStore.newsActivePage, allPages: newsStore.newsCountPages })}</div>
                    <div className="col-12 col-sm-12 col-md-3 col-lg-3 justify-content-end">
                        <select ref={selectSort} onChange={sortNews} className="form-select mt-3 mb-3 me-3" aria-label="Default select example">
                            <option value="default">{t('blog_page.selectDate-dafault')}</option>
                            <option value={"new"}>{t('blog_page.selectSort-new')}</option>
                            <option value={"maxStatus"}>{t('blog_page.selectRating-mostPopular')}</option>
                        </select>
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
                        shortPagination={true}
                        dataLength={newsStore.newsData.length}
                    ></NewsPagination>
                </div>
            </div>
        </div >
    )
})

export default Blog