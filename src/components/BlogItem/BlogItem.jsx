import './BlogItem.scss'

import test_img from "../../images/logReg_bg.png"
import { useState } from 'react'
import { useTranslation } from 'react-i18next';

const BlogItem = (props) => {
    let { img, text, header, data } = props.data
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
                        <div className="col-10 text-start fs-3 blogTitle">{header}</div>
                        <div className="col-2 text-end">{data}</div>
                    </div>
                    <div>
                        {
                            btnOpenNews
                                ?
                                <p className='fullText'>{text}</p>
                                :
                                <p className='news_text'>{text.substring(0, 300)}...</p>
                        }
                    </div>
                    <div className='d-flex justify-content-end'>
                        <button onClick={() => SetbtnOpenNews(!btnOpenNews)}><strong>{btnOpenNews ? t('blog_page.readBtn-hide') : t('blog_page.readBtn-readInFull')}</strong></button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BlogItem