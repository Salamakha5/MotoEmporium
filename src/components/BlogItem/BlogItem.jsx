import './BlogItem.scss'

import clientStore from '../../store/clientStore';

import { useState } from 'react'
import { useTranslation } from 'react-i18next';
import { observer } from 'mobx-react-lite';

const BlogItem = observer((props) => {

    let { img, text, header, data, status } = props.data
    const [btnOpenNews, SetbtnOpenNews] = useState(false)
    const { t } = useTranslation();

    return (
        <div className='blogItem border-bottom border-2 border-dark'>
            <div className="row">
                {
                    btnOpenNews
                        ?
                        <div className="d-none d-lg-flex col-4 col-img d-flex align-items-center justify-content-center">
                            <img src={img} alt="blog picture" />
                        </div>
                        :
                        <div className="d-none d-lg-flex col-3  col-img d-flex align-items-center justify-content-center">
                            <img src={img} alt="blog picture" />
                        </div>
                }
                <div className="col ">
                    <div className="textInfo row m-0">
                        <div className="blogTitle | col-8 text-start">{clientStore.currentLang == "ua" ? header.ua : header.en}</div>
                        <div className="textInfo__text col-4 text-end mb-1">
                            <div>{data}</div>
                            <div>{clientStore.currentLang == "ua" ? "Рейтинг" : "Rating"}: {status}</div>
                        </div>
                    </div>
                    <div className="col-img | d-block d-lg-none col-12 d-flex align-items-center justify-content-center">
                        <img src={img} alt="blog picture" />
                    </div>
                    <div>
                        {
                            btnOpenNews
                                ?
                                <p className='news_fullText'>{clientStore.currentLang == "ua" ? text.ua : text.en}</p>
                                :
                                <p className='news_trimText'>{clientStore.currentLang == "ua" ? text.ua.substring(0, 300) : text.en.substring(0, 300)}...</p>
                        }
                    </div>
                    <div className='d-flex justify-content-end pt-2'>
                        <button className='btn-readFull' onClick={() => SetbtnOpenNews(!btnOpenNews)}>{btnOpenNews ? t('blog_page.readBtn-hide') : t('blog_page.readBtn-readInFull')}</button>
                    </div>
                </div>
            </div>
        </div>
    )
})

export default BlogItem