import './AdminProduct.scss'

import clientStore from "../../../store/clientStore";
import serverStore from '..//../../store/serverStore'

import { useState } from 'react'
import { NavLink, useNavigate } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { useTranslation } from 'react-i18next';
import alertify from 'alertifyjs'
import { useFormik } from "formik";
import * as Yup from "yup"
import { toJS } from 'mobx'

const AdminProduct = observer((props) => {

    const navigate = useNavigate()
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
            newBrand: Yup.string().min(5, t('yupErrors.valid-field', { num: 5 })).max(50, t('yupErrors.valid-maxLength', { num: 50 })),
            newModel: Yup.string().min(5, t('yupErrors.valid-field', { num: 5 })).max(50, t('yupErrors.valid-maxLength', { num: 50 })),
            newPrice: Yup.string().min(3, t('yupErrors.valid-field', { num: 3 })).max(50, t('yupErrors.valid-maxLength', { num: 50 })),
            newImgUrl1: Yup.string().min(5, t('yupErrors.valid-field', { num: 5 })).max(200, t('yupErrors.valid-maxLength', { num: 200 })),
            newImgUrl2: Yup.string().min(5, t('yupErrors.valid-field', { num: 5 })).max(200, t('yupErrors.valid-maxLength', { num: 200 })),
            newImgUrl3: Yup.string().min(5, t('yupErrors.valid-field', { num: 5 })).max(200, t('yupErrors.valid-maxLength', { num: 200 })),
            newType: Yup.string().min(5, t('yupErrors.valid-field', { num: 5 })).max(50, t('yupErrors.valid-maxLength', { num: 50 })),
            newDisplacement: Yup.string().min(5, t('yupErrors.valid-field', { num: 5 })).max(50, t('yupErrors.valid-maxLength', { num: 50 })),
            newBorexStroke: Yup.string().min(5, t('yupErrors.valid-field', { num: 5 })).max(50, t('yupErrors.valid-maxLength', { num: 50 })),
            newCompressionRatio: Yup.string().min(3, t('yupErrors.valid-field', { num: 3 })).max(50, t('yupErrors.valid-maxLength', { num: 50 })),
            newHorsepower: Yup.string().min(5, t('yupErrors.valid-field', { num: 5 })).max(50, t('yupErrors.valid-maxLength', { num: 50 })),
            newTorque: Yup.string().min(5, t('yupErrors.valid-field', { num: 5 })).max(50, t('yupErrors.valid-maxLength', { num: 50 })),
            newFuelSystem: Yup.string().min(5, t('yupErrors.valid-field', { num: 5 })).max(200, t('yupErrors.valid-maxLength', { num: 200 })),
            newGearbox: Yup.string().min(5, t('yupErrors.valid-field', { num: 5 })).max(200, t('yupErrors.valid-maxLength', { num: 200 })),
        })
    })
    let eF = editFormik

    function oneField(title, displayData, nWidth, nType, nPlaceholder, name, initialValObject, errorsObject) {

        return (
            <div className={editIsActive ? 'item ifEditActive' : 'item'} ><div>{title} <span className='data-span'>{displayData}</span></div>
                {editIsActive ? <>
                    <i className="bi bi-arrow-right mx-3"></i>
                    <input style={{ width: nWidth }} type={nType} placeholder={nPlaceholder} className='form-control'
                        name={name} onChange={eF.handleChange} value={initialValObject}></input>

                    <div className='error-string'>{errorsObject ? errorsObject : ""}</div>
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
        let { newBrand, newModel, newPrice, newImgUrl1, newImgUrl2, newImgUrl3, newType, newDisplacement,
            newBorexStroke, newCompressionRatio, newHorsepower, newTorque, newFuelSystem, newGearbox } = eF.values

        let titlesArr = ['0', 'Бренд', 'Модель', 'Ціна', 'картинка 1', 'картинка 2', 'картинка 3', 'Тип', 'Кубатура двигуна',
            'Діаметр поршнів', 'Коефіцієнт стиснення', 'Кількість кіньських сил', 'Крутний момент', 'Паливна система', 'Коробка передач']

        function rowBuilder(order, title, boldSpan, type, fieldVal, defaultVal, isNeedBr) {
            console.log(type);
            return (`${order}.${title}: <span ${boldSpan ? "class='fw-bold'" : false}>
            ${type == 'string' ? (fieldVal.length == 0 ? fieldVal = defaultVal : fieldVal)
                    :
                    (type == 'number' ? fieldVal <= 0 ? fieldVal = clientStore.formatPrice(defaultVal) : clientStore.formatPrice(fieldVal)
                        :
                        fieldVal = 'TYPE ERROR')}</span> 
            ${isNeedBr ? "</br>" : false}`)
        }

        if (eF.isValid) {

            alertify.confirm('Підтвердити зміни?', `
            ${rowBuilder('1', titlesArr[1], true, "string", newBrand, brand, true)}
            ${rowBuilder('2', titlesArr[2], true, "string", newModel, model, true)}
            ${rowBuilder('3', titlesArr[3], true, "number", newPrice, price, true)}
            ${rowBuilder('4', titlesArr[4], true, "string", newImgUrl1, imgURL[0], true)}
            ${rowBuilder('5', titlesArr[5], true, "string", newImgUrl2, imgURL[1], true)}
            ${rowBuilder('6', titlesArr[6], true, "string", newImgUrl3, imgURL[2], true)}
            ${rowBuilder('7', titlesArr[7], true, "string", newType, collectionType, true)}
            ${rowBuilder('8', titlesArr[8], true, "string", newDisplacement, displacement, true)}
            ${rowBuilder('9', titlesArr[9], true, "string", newBorexStroke, borexStroke, true)}
            ${rowBuilder('10', titlesArr[10], true, "string", newCompressionRatio, compressionRatio, true)}
            ${rowBuilder('11', titlesArr[11], true, "string", newHorsepower, horsepower, true)}
            ${rowBuilder('12', titlesArr[12], true, "string", newTorque, torque, true)}
            ${rowBuilder('13', titlesArr[13], true, "string", newFuelSystem, fuelSystem, true)}
            ${rowBuilder('14', titlesArr[14], true, "string", newGearbox, gearbox, true)}
            <hr/>
            ! - Ви можете залишити поле пустим щоб залишити данні без змін - !
            `,
                function () {

                    // То по ідеї оновить данні в нашій таблиці
                    // serverStore.getAllMoto(() => { })

                    // Якщо getAllMoto не спрацює тоді це перезагрузить сторінку
                    // navigate(0)

                    alertify.success('Зміни збережено!')
                },
                function () { });
        }

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
                                            <i className="bi bi-arrow-down mx-3 my-2"></i>
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

                                        <div className='error-string'>{eF.errors.newImgUrl1 ? '1' + ' ' + eF.errors.newImgUrl1 : ""}</div>
                                        <div className='error-string'>{eF.errors.newImgUrl2 ? '2' + ' ' + eF.errors.newImgUrl2 : ""}</div>
                                        <div className='error-string'>{eF.errors.newImgUrl3 ? '3' + ' ' + eF.errors.newImgUrl3 : ""}</div>
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
                                {oneField('Бренд:', brand, "300px", "text", "new brand", "newBrand", eF.values.newBrand, eF.errors.newBrand)}
                                {oneField('Модель:', model, "300px", "text", "new model", "newModel", eF.values.newModel, eF.errors.newModel)}
                                {oneField('Ціна:', clientStore.formatPrice(price), "300px", "Number", "new price", "newPrice", eF.values.newPrice, eF.errors.newPrice)}
                                {oneField('Тип:', collectionType, "300px", "text", "new type", "newType", eF.values.newType, eF.errors.newType)}
                                {oneField('Кубатура двигуна:', displacement, "300px", "text", "new displacement", "newDisplacement", eF.values.newDisplacement, eF.errors.newDisplacement)}
                                {oneField('Діаметр поршнів:', borexStroke, "300px", "text", "new borex stroke", "newBorexStroke", eF.values.newBorexStroke, eF.errors.newBorexStroke)}
                                {oneField('Коефіцієнт стиснення:', compressionRatio, "300px", "text", "new compression ratio", "newCompressionRatio", eF.values.newCompressionRatio, eF.errors.newCompressionRatio)}
                                {oneField('Кількість кіньських сил:', horsepower, "300px", "text", "new horsepower", "newHorsepower", eF.values.newHorsepower, eF.errors.newHorsepower)}
                                {oneField('Крутний момент:', torque, "300px", "text", "new torque", "newTorque", eF.values.newTorque, eF.errors.newTorque)}
                                <div className={editIsActive ? 'item ifEditActive textarea-items' : 'item textarea-items'}><div>Паливна система: <span className='data-span'>{fuelSystem}</span></div>
                                    {editIsActive ? <>
                                        <i className="bi bi-arrow-right mx-3"></i>
                                        <textarea className='form-control' placeholder='new fuel system'
                                            name="newFuelSystem" onChange={eF.handleChange} value={eF.values.newFuelSystem}></textarea>
                                        <div className='error-string'>{eF.errors.newFuelSystem ? eF.errors.newFuelSystem : ""}</div>
                                    </> : false}
                                </div>
                                <div className={editIsActive ? 'item ifEditActive textarea-items' : 'item textarea-items'}><div>Коробка передач: <span className='data-span'>{gearbox}</span></div>
                                    {editIsActive ? <>
                                        <i className="bi bi-arrow-right mx-3"></i>
                                        <textarea className='form-control' placeholder='new gearbox'
                                            name="newGearbox" onChange={eF.handleChange} value={eF.values.newGearbox}></textarea>
                                        <div className='error-string'>{eF.errors.newGearbox ? eF.errors.newGearbox : ""}</div>
                                    </> : false}
                                </div>
                            </form>
                        </div>
                        <div className='d-flex align-items-end justify-content-end col-12 col-md-4 col-lg-4 col-xl-2'>
                            <div className="buttons-cont">
                                <button className="mainButton delete | btn px-4 py-2" onClick={sureDelete}>Видалити</button>

                                <button onClick={() => seteditIsActive(!editIsActive)} className="mainButton edit | btn px-4 py-2">Редагувати</button>

                                {editIsActive ? <button onClick={saveChanges}
                                    className={eF.isValid && eF.dirty ? "mainButton save | btn px-4 py-2" : '"mainButton save btn disabled | btn px-4 py-2"'}>Зберегти</button> : false}

                                <button className='mainButton btn-readFull' onClick={() => setbtnOpen(!btnOpen)}>{btnOpen ? 'Приховати' : 'Розкрити'}</button>
                            </div>
                        </div>
                    </>
                    :
                    <>
                        <div className="img-cont | col-12 col-md-12 col-lg-4 col-xl-3">
                            <img style={{ height: "200px" }} src={imgURL[0]} alt="Product img" />
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
                            <div style={{ height: "120px" }} className="buttons-cont">
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