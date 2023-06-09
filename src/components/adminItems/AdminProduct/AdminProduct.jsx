import './AdminProduct.scss'

import clientStore from "../../../store/clientStore";

import { useState } from 'react'
import { NavLink } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { useTranslation } from 'react-i18next';
import alertify from 'alertifyjs'
import { useFormik } from "formik";
import * as Yup from "yup"
import { toJS } from 'mobx'

const AdminProduct = observer((props) => {

    const { t } = useTranslation();
    const { _id, brand, model, price, imgURL, collectionType, displacement, borexStroke,
        compressionRatio, horsepower, torque, fuelSystem, gearbox, __v } = toJS(props.data);
    const [btnOpen, setbtnOpen] = useState(false)
    const [editIsActive, seteditIsActive] = useState(false)
    const [currentImg, setCurrentImg] = useState(0)

    const editFormik = useFormik({
        initialValues: {
            newBrand: brand,
            newModel: model,
            newPrice: price,
            newImgUrl1: toJS(imgURL[0]),
            newImgUrl2: toJS(imgURL[1]),
            newImgUrl3: toJS(imgURL[2]),
            newType: collectionType,
            newDisplacement: displacement,
            newBorexStroke: borexStroke,
            newCompressionRatio: compressionRatio,
            newHorsepower: horsepower,
            newTorque: torque,
            newFuelSystem: fuelSystem,
            newGearbox: gearbox
        },
        validationSchema: Yup.object({
            newBrand: Yup.string().required(t('yupErrors.required'))
                .min(4, t('yupErrors.valid-field', { num: 4 })).max(20, t('yupErrors.valid-maxLength', { num: 20 })),
        })
    })
    let eF = editFormik

    function oneField(title, displayData, nWidth, nType, nPlaceholder, name, initialValLink) {

        return (
            <div className={editIsActive ? 'item ifEditActive' : 'item'} ><div>{title} <span className='data-span'>{displayData}</span></div>
                {editIsActive ? <>
                    <i class="bi bi-arrow-right mx-3"></i>
                    <input style={{ width: nWidth }} type={nType} placeholder={nPlaceholder} className='form-control'
                        name={name} onChange={eF.handleChange} value={initialValLink}></input>
                </> : false
                }
            </div >
        )
    }

    function sureDelete() {
        alertify.confirm('Попередження', 'Ви впевнені що хочете видалити цей товар?',
            function () { alertify.success('Видалено успішно') },
            function () { alertify.error('відмінено') });
    }

    function saveChanges() {
        const { newBrand, newModel, newPrice, newImgUrl1, newImgUrl2, newImgUrl3, newType, newDisplacement,
            newBorexStroke, newCompressionRatio, newHorsepower, newTorque, newFuelSystem, newGearbox } = eF.values

        let titlesArr = ['Бренд', 'Модель', 'Ціна', 'картинка 1', 'картинка 2', 'картинка 3', 'Тип', 'Кубатура двигуна',
            'Діаметр поршнів', 'Коефіцієнт стиснення', 'Кількість кіньських сил', 'Крутний момент', 'Паливна система', 'Коробка передач']

        let i = 0
        let finalStr = ``
        for (let key in eF.values) {
            i++
            finalStr += `${i}.${titlesArr[i]}: ${eF.values[key]} </br> `
        }

        alertify.alert('infa', finalStr)
        // Бренд: <span class='fs-5 fw-bold'>${newBrand}</span>
        // <br> Модель: <span class='fs-5 fw-bold'>${newModel}</span>
        // <br> Ціна: <span class='fs-5 fw-bold'>${clientStore.formatPrice(newPrice)}</span>
    }

    return (
        <div className='admProduct | row'>

            {
                btnOpen ?
                    <>
                        <div className="img-cont | col-12 col-md-12 col-lg-12 col-xl-4">
                            <img className='col-12' src={imgURL[currentImg]} alt="Product img" />
                            <div className='mini-images-cont'>
                                <div className="miniImgCont" onClick={() => setCurrentImg(0)} data-hover-text={t('oneMoto_page.img-data-text-choose')}>
                                    <img src={imgURL[0]} />
                                </div>
                                <div className="miniImgCont" onClick={() => setCurrentImg(1)} data-hover-text={t('oneMoto_page.img-data-text-choose')}>
                                    <img src={imgURL[1]} />
                                </div>
                                <div className="miniImgCont" onClick={() => setCurrentImg(2)} data-hover-text={t('oneMoto_page.img-data-text-choose')}>
                                    <img src={imgURL[2]} />
                                </div>
                            </div>
                            {editIsActive ? <>
                                <div className={editIsActive ? 'item ifEditActive' : 'item'} ><div>Картинка {currentImg + 1} (посилання)</div>
                                    {editIsActive ? <>
                                        <div className='d-flex justify-content-center'>
                                            <i class="bi bi-arrow-down mx-3 my-2"></i>
                                        </div>
                                        {/* 1 */}
                                        <input style={currentImg == 0 ? { width: "100%", display: 'block' } : { display: 'none' }}
                                            type='text' placeholder='new img 1' className='form-control img-active1 mb-3'
                                            name="newImgUrl1" onChange={eF.handleChange} value={eF.values.newImgUrl1}></input>
                                        {/* 2 */}
                                        <input style={currentImg == 1 ? { width: "100%", display: 'block' } : { display: 'none' }}
                                            type='text' placeholder='new img 2' className='form-control img-active2 mb-3'
                                            name="newImgUrl2" onChange={eF.handleChange} value={eF.values.newImgUrl2}></input>
                                        {/* 3 */}
                                        <input style={currentImg == 2 ? { width: "100%", display: 'block' } : { display: 'none' }}
                                            type='text' placeholder='new img 3' className='form-control img-active3 mb-3'
                                            name="newImgUrl3" onChange={eF.handleChange} value={eF.values.newImgUrl3}></input>
                                    </> : false
                                    }
                                </div >
                            </> : false}
                        </div>
                        <div className="info-cont | col-12 col-md-8 col-lg-8 col-xl-6">
                            <div className="item id">ID Товару: <span className='italic-text data-span'>{_id}</span></div>
                            <div className='item'>Змін данних: <span className='data-span'>{__v}</span></div>
                            <hr />
                            <form className='editform'>
                                {oneField('Бренд:', brand, "300px", "text", "new brand", "newBrand", eF.values.newBrand)}
                                {oneField('Модель:', model, "300px", "text", "new model", "newModel", eF.values.newModel)}
                                {oneField('Ціна:', clientStore.formatPrice(price), "300px", "Number", "new price", "newPrice", eF.values.newPrice)}
                                {oneField('Тип:', collectionType, "300px", "text", "new type", "newType", eF.values.newType)}
                                {oneField('Кубатура двигуна:', displacement, "300px", "text", "new displacement", "newDisplacement", eF.values.newDisplacement)}
                                {oneField('Діаметр поршнів:', borexStroke, "300px", "text", "new borex stroke", "newBorexStroke", eF.values.newBorexStroke)}
                                {oneField('Коефіцієнт стиснення:', compressionRatio, "300px", "text", "new compression ratio", "newCompressionRatio", eF.values.newCompressionRatio)}
                                {oneField('Кількість кіньських сил:', horsepower, "300px", "text", "new horsepower", "newHorsepower", eF.values.newHorsepower)}
                                {oneField('Крутний момент:', torque, "300px", "text", "new torque", "newTorque", eF.values.newTorque)}
                                <div className={editIsActive ? 'item ifEditActive textarea-items' : 'item textarea-items'}><div>Паливна система: <span className='data-span'>{fuelSystem}</span></div>
                                    {editIsActive ? <>
                                        <i class="bi bi-arrow-right mx-3"></i>
                                        <textarea className='form-control' placeholder='new fuel system'
                                            name="newFuelSystem" onChange={eF.handleChange} value={eF.values.newFuelSystem}></textarea>
                                    </> : false}
                                </div>
                                <div className={editIsActive ? 'item ifEditActive textarea-items' : 'item textarea-items'}><div>Коробка передач: <span className='data-span'>{gearbox}</span></div>
                                    {editIsActive ? <>
                                        <i class="bi bi-arrow-right mx-3"></i>
                                        <textarea className='form-control' placeholder='new gearbox'
                                            name="newGearbox" onChange={eF.handleChange} value={eF.values.newGearbox}></textarea>
                                    </> : false}
                                </div>
                            </form>
                        </div>
                        <div className='d-flex align-items-end justify-content-end col-12 col-md-4 col-lg-4 col-xl-2'>
                            <div className="buttons-cont">
                                <button className="mainButton delete | btn px-4 py-2"
                                    onClick={sureDelete}>Видалити</button>
                                <button onClick={() => seteditIsActive(!editIsActive)} className="mainButton edit | btn px-4 py-2">Редагувати</button>
                                <button onClick={saveChanges} className="mainButton save | btn px-4 py-2">Зберегти</button>
                                <button className='mainButton btn-readFull' onClick={() => setbtnOpen(!btnOpen)}>{btnOpen ? 'Приховати' : 'Розкрити'}</button>
                            </div>
                        </div>
                    </>
                    :
                    <>
                        <div className="img-cont | col-12 col-md-12 col-lg-4 col-xl-3">
                            <img src={imgURL[0]} alt="Product img" />
                        </div>
                        <div className="info-cont | col-12 col-sm-6 col-md-6 col-lg-6 col-xl-7">
                            <div className="item id">ID Товару: <span className='italic-text data-span'>{_id}</span></div>
                            <div className='item'>Змін данних: <span className='data-span'>{__v}</span></div>
                            <hr />
                            <div className='item'>Бренд: <span className='data-span'>{brand}</span></div>
                            <div className='item'>Модель: <span className='data-span'>{model}</span></div>
                            <div className='item'>Ціна: <span className='data-span'>{clientStore.formatPrice(price)}</span></div>
                            <div className='item'>Тип: <span className='data-span'>{collectionType}</span></div>
                        </div>
                        <div className='d-flex align-items-end justify-content-end col-12 col-sm-6 col-md-6 col-lg-2 col-xl-2'>
                            <div className="buttons-cont">
                                <button className="mainButton delete | btn px-4 py-2"
                                    onClick={sureDelete}>Видалити</button>
                                <NavLink to={`/moto/?id=${_id}`} className="mainButton view | btn px-4 py-2">Переглянути</NavLink>
                                <button className='mainButton btn-readFull' onClick={() => setbtnOpen(!btnOpen)}>{btnOpen ? 'Приховати' : 'Розкрити'}</button>
                            </div>
                        </div>
                    </>
            }

        </div >
    )
})

export default AdminProduct