import React, { useEffect, useState } from 'react'
import serverStore from '../../store/serverStore';
import { toJS } from 'mobx';
import { observer } from 'mobx-react-lite';
import { NavLink } from "react-router-dom";
import "./oneMoto.scss"
import OtherMoto from '../../components/otherMoto/otherMoto';

const OneMoto = observer(() => {
    useEffect(() => {
        serverStore.getIdUrl()
        serverStore.getAllMoto()
    }, [])

    const [modalWindow,setmodalWindow] = useState("d-none")
    const [imgNum,setImgNum] = useState(0)
    let {brand,model,price,collectionType,displacement,borexStroke,compressionRatio,horsepower,torque,fuelSystem,gearbox} = serverStore.OneMoto
    return (
        <div className='OneMoto_Container'>
            <div onClick={()=>setmodalWindow("d-none")} className={'OneMoto_modalWondow '+modalWindow}>
                <div className='modalWindow'>
                    <div><a><i class="bi bi-x-lg fs-2"></i></a></div>
                    <div className='d-flex justify-content-center mt-2'>
                        <div className='me-5'>
                            <p className='fs-3'>Бренд : {brand}</p>
                            <p className='fs-4 mt-3'>Ціна : <span className='OneMoto_fontStyle'>{price}$</span></p>
                            <p className='fs-4 mt-3'>Кубатура : <span className='OneMoto_fontStyle'>{displacement}</span></p>
                            <p className='fs-4 mt-3'>Коефіцієнт стиснення : <span className='OneMoto_fontStyle'>{compressionRatio}</span></p>
                            <p className='fs-4 mt-3'>Крутний момент : <span className='OneMoto_fontStyle'>{torque}</span></p>
                            <p className='fs-4 mt-3'>Коробка передач : <span className='fs-5 d-flex mt-2 OneMoto_fontStyle'>{gearbox}</span></p>
                        </div>
                        <div>
                            <p className='fs-3'>Модель : {model}</p>
                            <p className='fs-4 mt-3'>Колекція : <span className='OneMoto_fontStyle'>{collectionType}</span></p>
                            <p className='fs-4 mt-3'>Діаметр поршнів : <span className='OneMoto_fontStyle'>{borexStroke}</span></p>
                            <p className='fs-4 mt-3'>Кінські сили : <span className='OneMoto_fontStyle'>{horsepower}</span></p>
                            <p className='fs-4 mt-3'>Паливна система : <span className='fs-5 d-flex mt-2 OneMoto_fontStyle'>{fuelSystem}</span></p>
                        </div>
                    </div>
                </div>
            </div>
            <div className='d-flex justify-content-center align-items-center'>
                <div className={"spinner-border text-warning m-4 " + serverStore.spinerInfo} role="status"></div>
            </div>
            <main className='row m-0 mt-4'>
                <div className="col">
                    <div className='w-100'>
                        {serverStore.spinerInfo == "d-none" ?
                            <div>
                                <div className=' d-flex justify-content-center mb-2'>
                                    <div className='OneMoto_imgContainer'>
                                        <img className='w-100 OneMoto_MainImage' src={serverStore.OneMoto.imgURL[imgNum]} alt="" />
                                    </div>
                                </div>
                                <div className='row m-0 ms-4 me-4 d-flex justify-content-center align-items-center'>
                                    <div className="col">
                                        <img onClick={()=>setImgNum(0)} className='w-100 OneMoto_miniImg' src={serverStore.OneMoto.imgURL[0]} alt="" />
                                    </div>
                                    <div className="col">
                                        <img onClick={()=>setImgNum(1)} className='w-100 OneMoto_miniImg' src={serverStore.OneMoto.imgURL[1]} alt="" />
                                    </div>
                                    <div className="col">
                                        <img onClick={()=>setImgNum(2)} className='w-100 OneMoto_miniImg' src={serverStore.OneMoto.imgURL[2]} alt="" />
                                    </div>
                                </div>
                            </div>
                            : false
                        }
                        <div className='d-flex justify-content-center mb-3 mt-3 align-items-center'>
                            <div>

                                <div className='d-flex justify-content-center align-items-center'>
                                    <button className='OneMoto_btn1' onClick={()=>setmodalWindow("d-flex")}>Технічні характеристики</button>
                                </div>
                                <div className='mt-3 d-flex justify-content-center align-items-center'>
                                    <NavLink to={"/shop"} className='OneMoto_btn2'>Назад до магазину</NavLink>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col OneMoto_rightBlock">
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
    )
})

export default OneMoto
