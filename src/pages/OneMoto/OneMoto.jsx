import './OneMoto.scss'

import ducatiImg from '../../images/ducati_background.png'

import serverStore from '../../store/serverStore';
import clientStore from '../../store/clientStore';

import React, { useEffect, useState } from 'react'
import { observer } from 'mobx-react-lite';
import { NavLink } from "react-router-dom";
import OtherMoto from "../../components/OtherMoto/OtherMoto";
import { useTranslation } from 'react-i18next';

const OneMoto = observer(() => {
    useEffect(() => {
        serverStore.getIdUrl()
        serverStore.getAllMoto(() => {
            serverStore.updateThreeMotos(serverStore.MotoData)
        })
    }, [])

    const { t } = useTranslation();

    const [imgNum, setImgNum] = useState(0)
    const { brand, model, price, collectionType, displacement, borexStroke,
        compressionRatio, horsepower, torque, fuelSystem, gearbox, _id } = serverStore.OneMoto

    brand != '' ? document.title = `${brand} - ${model} | MotoEmporium` : document.title = `Motocycle | MotoEmporium`;

    function AddMotoToBasket() {
        // добавлення id мото до localStorage
        let motoBasket = JSON.parse(localStorage.getItem("BasketMoto"))
        if (motoBasket) {
            // Перевірка на наявність такого id у localStorage
            if (!motoBasket.some(moto => moto["id"] === _id)) {
                motoBasket.push({ id: _id, current: 1 })
                localStorage.setItem("BasketMoto", JSON.stringify(motoBasket))
            }

        } else { localStorage.setItem("BasketMoto", JSON.stringify([{ id: _id, current: 1 }])) }
        serverStore.IsMotoBuy = true
    }
    function AddToFavorite() {
        // добавлення id мото до localStorage
        let motoFavorite = JSON.parse(localStorage.getItem("FavoriteMoto"))
        if (motoFavorite) {
            // Перевірка на наявність такого id у localStorage
            if (!motoFavorite.includes(_id)) {
                motoFavorite.push(_id)
                localStorage.setItem("FavoriteMoto", JSON.stringify(motoFavorite))
            }

        } else { localStorage.setItem("FavoriteMoto", JSON.stringify([_id])) }
        serverStore.IsFavoriteMoto = true
    }

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
                                        <div className="miniImgCont | col" onClick={() => setImgNum(0)} data-hover-text={t('oneMoto_page.img-data-text-choose')}>
                                            <img src={serverStore.OneMoto.imgURL[0]} />
                                        </div>
                                        <div className="miniImgCont | col" onClick={() => setImgNum(1)} data-hover-text={t('oneMoto_page.img-data-text-choose')}>
                                            <img src={serverStore.OneMoto.imgURL[1]} />
                                        </div>
                                        <div className="miniImgCont | col" onClick={() => setImgNum(2)} data-hover-text={t('oneMoto_page.img-data-text-choose')}>
                                            <img src={serverStore.OneMoto.imgURL[2]} />
                                        </div>
                                    </div>
                                </div>
                                : false
                        }
                        <div className='buttons-cont | py-5'>
                            <button className="btn mainButton | btn p-3" type="button" data-bs-toggle="collapse" data-bs-target="#specificationsCollapse" aria-expanded="false" aria-controls="specificationsCollapse">
                                {t('oneMoto_page.techChar.btn-title')}</button>
                            <div className="collapse pt-3" id="specificationsCollapse">
                                <ul className="list-group">
                                    <li className="list-group-item"><span className="item-title">{t('oneMoto_page.techChar.brand')}:</span>
                                        <span>{brand}</span></li>
                                    <li className="list-group-item"><span className="item-title">{t('oneMoto_page.techChar.model')}:</span>
                                        <span>{model}</span></li>
                                    <li className="list-group-item"><span className="item-title">{t('oneMoto_page.techChar.type')}:</span>
                                        <span>{collectionType}</span></li>
                                    <li className="list-group-item"><span className="item-title">{t('oneMoto_page.techChar.engineCapacity')}:</span>
                                        <span>{displacement}</span></li>
                                    <li className="list-group-item"><span className="item-title">{t('oneMoto_page.techChar.pistonDiameter')}:</span>
                                        <span>{borexStroke}</span></li>
                                    <li className="list-group-item"><span className="item-title">{t('oneMoto_page.techChar.compressionRatio')}:</span>
                                        <span>{compressionRatio}</span></li>
                                    <li className="list-group-item"><span className="item-title">{t('oneMoto_page.techChar.horsePower')}:</span>
                                        <span>{horsepower}</span></li>
                                    <li className="list-group-item"><span className="item-title">{t('oneMoto_page.techChar.torque')}:</span>
                                        <span>{torque}</span></li>
                                    <li className="list-group-item"><span className="item-title">{t('oneMoto_page.techChar.fuelSystem')}:</span>
                                        <span>{fuelSystem}</span></li>
                                    <li className="list-group-item"><span className="item-title">{t('oneMoto_page.techChar.gearbox')}:</span>
                                        <span>{gearbox}</span></li>
                                </ul>
                            </div>
                            <NavLink className='goBack-left mainButton | btn p-3 mt-4' to={"/shop"} >{t('oneMoto_page.btn-goBack')}</NavLink>
                        </div>
                    </div>

                    <div className="oneMoto__rightPart | col-7">
                        <div className='infoBLock'>
                            <img className="background-image" src={ducatiImg} />
                            <h1 className="infoBLock__brand-model">{brand} - {model}</h1>
                            <h2 className='infoBLock__status small-items'>
                                {
                                    price > 11000 ?
                                        <div>{t('oneMoto_page.status')}: <span>{t('oneMoto_page.status_new')}</span> </div> :
                                        <div>{t('oneMoto_page.status')}: <span>{t('oneMoto_page.status_used')}</span> </div>
                                }
                            </h2>
                            <h2 className='infoBLock__price'><span>{clientStore.formatPrice(price - 1509)} - {clientStore.formatPrice(price)}</span></h2>
                            <h2 className='infoBLock__collection small-items'>{t('oneMoto_page.infoBlock.type')}: <span>{collectionType}</span></h2>
                            <h2 className='infoBLock__power small-items'>{t('oneMoto_page.infoBlock.power')}: <span>{horsepower}</span></h2>
                            <div className='buttonsCont'>
                                {/* favorite */}
                                {
                                    serverStore.IsFavoriteMoto
                                        ?
                                        <button className='addToFavorite' onClick={AddToFavorite} >
                                            <i className="bi bi-heart-fill"></i>
                                            {t("fav_page.added")}
                                        </button>
                                        :
                                        <button className='addToFavorite' onClick={AddToFavorite} >
                                            <i className="bi bi-heart"></i>
                                            {t('oneMoto_page.infoBlock.btn-addToWishList')}
                                        </button>
                                }

                                {
                                    serverStore.IsStorageId ?
                                        <button disabled className='addToCart mainButton | btn'>
                                            {t("oneMoto_page.added")}
                                        </button>
                                        :

                                        <div className='d-flex justify-content-center align-items-center'>
                                            {
                                                serverStore.IsMotoBuy ?
                                                    <button onClick={AddMotoToBasket} className='addToCart mainButton | btn p-3' disabled>{t('oneMoto_page.infoBlock.btn-addingToCart')}</button>
                                                    :
                                                    <button onClick={AddMotoToBasket} className='addToCart mainButton | btn p-3'>{t('oneMoto_page.infoBlock.btn-addToCart')}</button>

                                            }
                                        </div>

                                }
                            </div>
                        </div>
                        <div className="check-more">
                            {
                                serverStore.MotoData.length > 2 ?
                                    <div>
                                        <h4 className='check-more__title'>{t('oneMoto_page.infoBlock.checkMore-title')}</h4>
                                        <div className='check-more__content | row'>
                                            {
                                                serverStore.threeMotoCard.map((p) => {
                                                    return <OtherMoto key={p._id} data={p} onClick={''}></OtherMoto>
                                                })
                                            }
                                        </div>
                                    </div>
                                    : false
                            }
                        </div>
                        <div className='d-flex justify-content-center'>
                            <NavLink className='goBack-right mainButton | btn p-3 mt-4' to={"/shop"} >{t('oneMoto_page.btn-goBack')}</NavLink>
                        </div>
                    </div>

                </main>
            </div>
        </div>
    )
})

export default OneMoto
