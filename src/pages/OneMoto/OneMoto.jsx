import "./OneMoto.scss"

import ducatiImg from '../../images/ducati_background.png'

import OtherMoto from '../../components/OtherMoto/OtherMoto';
import serverStore from '../../store/serverStore';
import clientStore from '../../store/clientStore';

import React, { useEffect, useState } from 'react'
import { observer } from 'mobx-react-lite';
import { NavLink } from "react-router-dom";
// import { toJS } from 'mobx';

const OneMoto = observer(() => {
    useEffect(() => {
        serverStore.getIdUrl()
        serverStore.getAllMoto()
    }, [])

    const [imgNum, setImgNum] = useState(0)
    const { brand, model, price, collectionType, displacement, borexStroke,
        compressionRatio, horsepower, torque, fuelSystem, gearbox } = serverStore.OneMoto

    brand != '' ? document.title = `${brand} - ${model} - MotoEmporium` : document.title = `Motocycle - MotoEmporium`;

    return (
        <div>
            <div className='oneMoto'>
                {/* loader */}
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
                                        <div className="miniImgCont | col" onClick={() => setImgNum(0)} data-hover-text='Вибрати'>
                                            <img src={serverStore.OneMoto.imgURL[0]} />
                                        </div>
                                        <div className="miniImgCont | col" onClick={() => setImgNum(1)} data-hover-text='Вибрати'>
                                            <img src={serverStore.OneMoto.imgURL[1]} />
                                        </div>
                                        <div className="miniImgCont | col" onClick={() => setImgNum(2)} data-hover-text='Вибрати'>
                                            <img src={serverStore.OneMoto.imgURL[2]} />
                                        </div>
                                    </div>
                                </div>
                                : false
                        }
                        <div className='buttons-cont | py-5'>
                            <button class="btn mainButton | btn btn-warning p-3" type="button" data-bs-toggle="collapse" data-bs-target="#specificationsCollapse" aria-expanded="false" aria-controls="specificationsCollapse">
                                Технічні характеристики</button>
                            <div class="collapse pt-3" id="specificationsCollapse">
                                <ul class="list-group">
                                    <li class="list-group-item"><span className="item-title">Бренд:</span>
                                        <span>{brand}</span></li>
                                    <li class="list-group-item"><span className="item-title">Модель:</span>
                                        <span>{model}</span></li>
                                    <li class="list-group-item"><span className="item-title">Тип:</span>
                                        <span>{collectionType}</span></li>
                                    <li class="list-group-item"><span className="item-title">Кубатура двигуна:</span>
                                        <span>{displacement}</span></li>
                                    <li class="list-group-item"><span className="item-title">Діаметр поршнів:</span>
                                        <span>{borexStroke}</span></li>
                                    <li class="list-group-item"><span className="item-title">Коефіцієнт стиснення:</span>
                                        <span>{compressionRatio}</span></li>
                                    <li class="list-group-item"><span className="item-title">Кінських сил:</span>
                                        <span>{horsepower}</span></li>
                                    <li class="list-group-item"><span className="item-title">Крутний момент:</span>
                                        <span>{torque}</span></li>
                                    <li class="list-group-item"><span className="item-title">Паливна система:</span>
                                        <span>{fuelSystem}</span></li>
                                    <li class="list-group-item"><span className="item-title">Коробка передач:</span>
                                        <span>{gearbox}</span></li>
                                </ul>
                            </div>
                            <NavLink className='goBack mainButton | btn btn-warning p-3 mt-4' to={"/shop"} >Назад до магазину</NavLink>
                        </div>
                    </div>

                    <div className="oneMoto__rightPart | col-7">
                        <div className='infoBLock'>
                            <img className="background-image" src={ducatiImg} />
                            <h1 className="infoBLock__brand-model">{brand} - {model}</h1>
                            <h2 className='infoBLock__status small-items'>
                                {
                                    price > 11000 ?
                                        <div>Стан: <span>Новий</span> </div> :
                                        <div>Стан: <span>Вживаний</span> </div>
                                }
                            </h2>
                            {/* <h2 className='infoBLock__price'><span> ${price - 1000} - ${price} </span></h2> */}
                            <h2 className='infoBLock__price'><span>{clientStore.formatPrice(price - 1509)} - {clientStore.formatPrice(price)}</span></h2>
                            <h2 className='infoBLock__collection small-items'>Тип: <span>{collectionType}</span></h2>
                            <h2 className='infoBLock__power small-items'>Потужність: <span>{horsepower}</span></h2>
                            <div className='buttonsCont'>
                                <button className='addToFavorite'>
                                    <i className="bi bi-heart"></i>
                                    {/* bi-heart-fill ==> active btn */}
                                    Добавити до списку бажань</button>
                                <button className='addToCart mainButton | btn btn-warning'>Добавити до корзини</button>
                            </div>
                        </div>
                        <div className="check-more">
                            {
                                serverStore.MotoData.length > 2 ?
                                    <div>
                                        <h4 className='check-more__title'>Перевірте інші мотоцикли</h4>
                                        <div className='check-more__content | row'>
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
