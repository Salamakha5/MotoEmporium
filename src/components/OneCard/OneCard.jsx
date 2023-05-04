import "./OneCard.scss"

import clientStore from "../../store/clientStore";

import { NavLink } from "react-router-dom";
import { observer } from "mobx-react-lite";

const OneCard = observer((props) => {

    const { imgURL, brand, model, price, collectionType, horsepower,_id } = props.data;

    function formatPrice(num) {
        // * то функція від чату gpt працює супер,
        // * АЛЕ я пробував перенести її в сторінку одного мотика не виходить 🤷‍♂️
        return '$' + num.toLocaleString('en-US', { currency: 'USD' });
    }

    return (
        <div className="oneCardWrap | p-3 col-12 col-sm-6 col-md-6 col-lg-3 col-xl-3">
            <div className="oneCard | p-3">
                <div className="oneCard__img | mb-4"><img src={imgURL[0]} /></div>
                <div className="oneCard__title | mb-2">{brand} - {model}</div>
                <div className="oneCard__type | pb-2">Тип: {collectionType}</div>
                <div className="oneCard__horsePower | pb-2">Потужність: {horsepower}</div>
                <div className="oneCard__priceCont | pt-2">{formatPrice(price)}</div>
                <div className="oneCard__btnCont | pt-5">
                    <NavLink to={`/moto/?id=${_id}`} className="mainButton | btn btn-warning px-4 py-2">Детальніше</NavLink>
                </div>
            </div>
        </div>
    )
})
export default OneCard