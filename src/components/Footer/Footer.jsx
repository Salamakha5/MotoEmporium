import './Footer.scss'

import { useTranslation } from 'react-i18next';


const Footer = () => {
    const { t } = useTranslation();

    const now = new Date();
    const currentYear = now.getFullYear();

    return (
        <div className='footer'>
            <div className='footer__nav'>
                <div className='footer__item'>
                    <ul>
                        <li className='footer__titles logo'>MotoEmporium</li>
                        <li className='small__lineHeigth pb-3 pe-5'>{t('footer.address')}</li>
                        <li><a className='main-link' href='tel:12345678910'>(123)-4567-8910</a></li>
                    </ul>
                </div>
                <div className='footer__item'>
                    <ul>
                        <li>{t('footer.link1')}</li>
                        <li>{t('footer.link2')}</li>
                        <li>{t('footer.link3')}</li>
                        <li>{t('footer.link4')}</li>
                        <li>{t('footer.link5')}</li>
                    </ul>
                </div>
                <div className='footer__item'>
                    <ul>
                        <li>{t('footer.link6')}</li>
                        <li>{t('footer.link7')}</li>
                        <li>{t('footer.link8')}</li>
                        <li>{t('footer.link9')}</li>
                        <li>{t('footer.link10')}</li>
                    </ul>
                </div>
                <div className='footer__item'>
                    <ul>
                        <li className='footer__titles'>{t('footer.storeHours')}</li>
                        <li>{t('footer.weekdays')}</li>
                        <li>{t('footer.saturday')}</li>
                        <li>{t('footer.whenClosed')}</li>
                    </ul>
                </div>
            </div>
            <div className="footer__copyright">
                <div className='text'>
                    <span>{t("footer.copyright", {year: currentYear})}</span>

                    <div className="socials">
                        <div className="socials__item"><i className="bi bi-facebook"></i></div>
                        <div className="socials__item"><i className="bi bi-instagram"></i></div>
                        <div className="socials__item"><i className="bi bi-linkedin"></i></div>
                        <div className="socials__item"><i className="bi bi-youtube"></i></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer