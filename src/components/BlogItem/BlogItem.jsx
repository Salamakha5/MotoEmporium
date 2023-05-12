import './BlogItem.scss'

import test_img from "../../images/logReg_bg.png"
import { useState } from 'react'
import { useTranslation } from 'react-i18next';
import clientStore from '../../store/clientStore';
import { observer } from 'mobx-react-lite';

const BlogItem = observer((props) => {
    let { img, text, header, data,status } = props.data
    const [btnOpenNews, SetbtnOpenNews] = useState(false)
    const { t } = useTranslation();
    return (
        <div className='blogItem border-bottom border-2 border-dark'>
            <div className="row">
                {
                    btnOpenNews
                        ?
                        <div className="col-4 col-img d-flex align-items-center justify-content-center">
                            <img src={img} alt="" />
                        </div>
                        :
                        <div className="col-3  col-img d-flex align-items-center justify-content-center">
                            <img src={img} alt="" />
                        </div>
                }
                <div className="col ">
                    <div className="textInfo row m-0">
                        <div className="col-10 text-start fs-3 blogTitle">{clientStore.currentLang == "ua"?header.ua : header.en}</div>
                        <div className="col-2 text-end">
                        <div>{data}</div>
                        <div className='mt-1'>{clientStore.currentLang == "ua"?"Статус" : "Status"}:{status}</div>
                        </div>
                    </div>
                    <div>
                        {
                            btnOpenNews
                                ?
                                <p className='fullText'>{clientStore.currentLang == "ua"?text.ua : text.en}</p>
                                :
                                <p className='news_text'>{clientStore.currentLang == "ua"?text.ua.substring(0, 300) : text.en.substring(0, 300)}...</p>
                        }
                    </div>
                    <div className='d-flex justify-content-end'>
                        <button onClick={() => SetbtnOpenNews(!btnOpenNews)}><strong>{btnOpenNews ? t('blog_page.readBtn-hide') : t('blog_page.readBtn-readInFull')}</strong></button>
                    </div>
                </div>
            </div>
        </div>
    )
})

export default BlogItem