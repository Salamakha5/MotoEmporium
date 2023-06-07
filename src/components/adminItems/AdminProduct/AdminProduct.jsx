import './AdminProduct.scss'

import clientStore from "../../../store/clientStore";

import { NavLink } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { useTranslation } from 'react-i18next';

const AdminProduct = observer((props) => {

    const { t } = useTranslation();
    const { _id, brand, model, price, imgURL, collectionType, displacement, borexStroke,
        compressionRatio, horsepower, torque, fuelSystem, gearbox, __v } = props.data;

    return (
        <div className='admProduct | row'>

            <div className="img-cont | col-4">
                <img src={imgURL[0]} alt="Product img" />
            </div>
            <div className="info-cont | col-8">
                <div className="item">ID Товару: <span className='italic-text data-span'>{_id}</span></div>
                <div className='item'>Змін данних: <span className='data-span'>{__v}</span></div>
                <hr/>
                <div className='item'>Бренд: <span className='data-span'>{brand}</span></div>
                <div className='item'>Модель: <span className='data-span'>{model}</span></div>
                <div className='item'>Ціна: <span className='data-span'>{clientStore.formatPrice(price)}</span></div>
                <div className='item'>Тип: <span className='data-span'>{collectionType}</span></div>
                <div className='item'>Кубатура двигуна: <span className='data-span'>{displacement}</span></div>
                <div className='item'>Діаметр поршнів: <span className='data-span'>{borexStroke}</span></div>
                <div className='item'>Коефіцієнт стиснення: <span className='data-span'>{compressionRatio}</span></div>
                <div className='item'>Кількість кіньських сил: <span className='data-span'>{horsepower}</span></div>
                <div className='item'>Крутний момент: <span className='data-span'>{torque}</span></div>
                <div className='item'>Паливна система: <span className='data-span'>{fuelSystem}</span></div>
                <div className='item'>Коробка передач: <span className='data-span'>{gearbox}</span></div>

            </div>

        </div>
    )
})

export default AdminProduct