import { observer } from "mobx-react-lite"
import "./BasketCard.scss"

import React, { useEffect, useState } from 'react'
import clientStore from "../../store/clientStore"
import { NavLink } from "react-router-dom"
import basketStore from "../../store/basketStore"

const BasketCard = observer((props) => {
  const { brand, model, price, collectionType, displacement, borexStroke,
    compressionRatio, horsepower, imgURL,torque, fuelSystem, gearbox, _id } = props.data



  function Deletemoto(){
    let motoStorage = JSON.parse(localStorage.getItem("BasketMoto"))
    motoStorage.splice(motoStorage.indexOf(_id),1)
    localStorage.setItem("BasketMoto",JSON.stringify(motoStorage))
    basketStore.getBasketMoto()
  }

  return (
      <div className="row  mb-2 BasketCard_container">
      <div className="col-3 p-0 card_img">
        <img className="w-100 h-100" src={imgURL[0]} alt="" />
      </div>
      <div className="col d-flex justify-content-between p-2 info_img">
        <div className="w-100">
          <p className="fs-4">{brand} - {model}</p>
          <p className="mt-2">Тип - {collectionType}</p>
          <p className="mt-2">Потужність - {horsepower}</p>
        </div>
        <div className=" w-100">
          <div className="d-flex justify-content-end w-100">
            <a onClick={Deletemoto}><i className="bi bi-x fs-2"></i></a>
          </div>
          <div className="w-100 d-flex justify-content-center">
            <p className="text-center fs-3 price">{clientStore.formatPrice(price)}</p>
          </div>
          <div className="d-flex justify-content-end mt-3">
            <button type="button" className="basket_btn">
              <div className="d-flex align-items-center">
                <i className="bi bi-heart p-0 m-0 fs-4 me-1"></i>
                Додати в обране
              </div>
            </button>
            <NavLink to={`/moto/?id=${_id}`} type="button" className="basket_btn">
              <div className="d-flex align-items-center">
                <i className="bi  bi-gear-fill p-0 m-0 fs-4 me-1"></i>
                Деталі
              </div>
            </NavLink>
          </div>
        </div>
      </div>
      </div>
  )
})

export default BasketCard