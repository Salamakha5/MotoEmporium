import "./oneMoto.scss"

import OtherMoto from '../../components/otherMoto/otherMoto';
import serverStore from '../../store/serverStore';

import React, { useEffect, useState } from 'react'
import { observer } from 'mobx-react-lite';
import { NavLink } from "react-router-dom";
// import { toJS } from 'mobx';

const OneMoto = observer(() => {
    useEffect(() => {
        serverStore.getIdUrl()
        serverStore.getAllMoto()
    }, [])

    const [modalWindowIsShow, setmodalWindowIsShow] = useState("d-none")
    const [imgNum, setImgNum] = useState(0)
    let { brand, model, price, collectionType, displacement, borexStroke,
        compressionRatio, horsepower, torque, fuelSystem, gearbox } = serverStore.OneMoto

    brand != '' ? document.title = `${brand} - ${model} - MotoEmporium` : document.title = `Motocycle - MotoEmporium`;

    return (
        <div>
            <div className='oneMoto'>
                <div onClick={() => setmodalWindowIsShow("d-none")} className={modalWindowIsShow}>
                    {/* <div className='OneMoto__modalWindow'>
                        <div><i className="bi bi-x-lg fs-2"></i></div>
                        <div className='d-flex justify-content-center mt-2'>
                            <div className='me-5'>
                                <p className='fs-3'>Бренд : {brand}</p>
                                <p className='fs-4 mt-3'>Ціна : <span>{price}$</span></p>
                                <p className='fs-4 mt-3'>Кубатура : <span>{displacement}</span></p>
                                <p className='fs-4 mt-3'>Коефіцієнт стиснення : <span>{compressionRatio}</span></p>
                                <p className='fs-4 mt-3'>Крутний момент : <span >{torque}</span></p>
                                <p className='fs-4 mt-3'>Коробка передач : <span>{gearbox}</span></p>
                            </div>
                            <div>
                                <p className='fs-3'>Модель : {model}</p>
                                <p className='fs-4 mt-3'>Колекція : <span className='OneMoto_fontStyle'>{collectionType}</span></p>
                                <p className='fs-4 mt-3'>Діаметр поршнів : <span className='OneMoto_fontStyle'>{borexStroke}</span></p>
                                <p className='fs-4 mt-3'>Кінські сили : <span className='OneMoto_fontStyle'>{horsepower}</span></p>
                                <p className='fs-4 mt-3'>Паливна система : <span className='fs-5 d-flex mt-2 OneMoto_fontStyle'>{fuelSystem}</span></p>
                            </div>
                        </div>
                    </div> */}
                </div>
                {/* loader */}
                {/* <div className='d-flex justify-content-center align-items-center'>
                    <div className={"spinner-border text-warning m-4 " + serverStore.spinerInfo} role="status"></div>
                </div> */}
                <div className={serverStore.spinerInfo === 'd-none' ? 'loader-pageWrap' : 'loader-pageWrap active'}>
                    <div className="loader active" id="loader-2">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </div>
                {/* pageContent */}
                <main className='oneMoto__contentCont | row'>

                    <div className="oneMoto__leftPart | col-5">
                        {
                            serverStore.spinerInfo == "d-none" ?
                                <div>
                                    <div className='mainImgCont | pb-4'>
                                        <img src={serverStore.OneMoto.imgURL[imgNum]} />
                                    </div>
                                    <div className='row'>
                                        <div className="miniImgCont | col">
                                            <img onClick={() => setImgNum(0)} src={serverStore.OneMoto.imgURL[0]} />
                                        </div>
                                        <div className="miniImgCont | col">
                                            <img onClick={() => setImgNum(1)} src={serverStore.OneMoto.imgURL[1]} />
                                        </div>
                                        <div className="miniImgCont | col">
                                            <img onClick={() => setImgNum(2)} src={serverStore.OneMoto.imgURL[2]} />
                                        </div>
                                    </div>
                                </div>
                                : false
                        }
                        <div className='buttons-cont | py-5'>
                            <button className='specifications mainButton | btn btn-warning p-3' onClick={() => setmodalWindowIsShow("d-flex")}>Технічні характеристики</button>
                            <NavLink className='goBack mainButton | btn btn-warning p-3 mt-4' to={"/shop"} >Назад до магазину</NavLink>

                            <a class="ggg btn-3 mb-3 mt-3" href="#"><span>можливо я дороблю такі кнопки</span></a>
                            <a class="ggg btn-7" href="#"><span>Alternate</span></a>
                        </div>
                    </div>

                    <div className="oneMoto_rightBlock | ps-5 col-7">
                        <div className='infoBLock'>
                            <h1>{serverStore.OneMoto.brand} - {serverStore.OneMoto.model}</h1>
                            <h3 className='mt-5'>Стан: Новий</h3>
                            <h2 className='price'>${serverStore.OneMoto.price - 500} - ${serverStore.OneMoto.price}</h2>
                            <h2 className='mt-5'>Колекція: <span className='fs-4'>{serverStore.OneMoto.collectionType}</span></h2>
                            <h2 className='mt-4'>Потужність : <span className='fs-4'>{serverStore.OneMoto.horsepower}</span></h2>

                            <div className='mt-5 mb-5 d-flex justify-content-center align-items-center'>
                                <button className='OneMoto_btn1'>Добавити до корзини</button>
                            </div>
                        </div>
                        <div>
                            <h1 className='text-center fs-2'>
                                Перевірте інші мотоцикли
                            </h1>
                            {
                                serverStore.MotoData.length > 2 ?
                                    <div className=''>
                                        <div className='row m-0 mt-4'>
                                            {
                                                serverStore.threeMotoCard.map((p) => {
                                                    return <OtherMoto key={p._id} data={p}></OtherMoto>
                                                })
                                            }
                                        </div>
                                    </div>
                                    : false
                            }
                        </div>
                    </div>

                </main>
            </div>
        </div>
    )
})

export default OneMoto
