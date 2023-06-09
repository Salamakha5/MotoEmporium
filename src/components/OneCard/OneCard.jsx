import "./OneCard.scss"

import clientStore from "../../store/clientStore";

import { NavLink } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { useTranslation } from 'react-i18next';

const OneCard = observer((props) => {

    const { t } = useTranslation();
    const { imgURL, brand, model, price, collectionType, horsepower,_id } = props.data;

    return (
        <div className="oneCardWrap | p-3 col-12 col-sm-6 col-md-6 col-lg-3 col-xl-3">
            <div className="oneCard | p-3">
                <div className="oneCard__img | mb-4"><img src={imgURL[0]} /></div>
                <div className="oneCard__title | mb-2">{brand} - {model}</div>
                <div className="oneCard__type | pb-2">{t('shop_page.oneCard.type')}: {collectionType}</div>
                <div className="oneCard__horsePower | pb-2">{t('shop_page.oneCard.power')}: {horsepower}</div>
                <div className="oneCard__priceCont | pt-2">{clientStore.formatPrice(price)}</div>
                <div className="oneCard__btnCont | pt-5">
                    <NavLink to={`/moto/?id=${_id}`} className="mainButton | btn px-4 py-2">{t('shop_page.oneCard.btn-title')}</NavLink>
                </div>
            </div>
        </div>
    )
})
export default OneCard