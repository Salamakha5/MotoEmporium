import { observer } from "mobx-react-lite"
import "./BasketCard.scss"
import { useTranslation } from 'react-i18next';

import clientStore from "../../store/clientStore"
import { NavLink } from "react-router-dom"
import basketStore from "../../store/basketStore"

const BasketCard = observer((props) => {
  const { brand, model, price, collectionType, displacement, borexStroke,
    compressionRatio, horsepower, current, imgURL, torque, fuelSystem, gearbox, _id } = props.data
  let maxCurrent = 10
  let minCurrent = 1
  const { t } = useTranslation();

  function Deletemoto() {
    let motoStorage = JSON.parse(localStorage.getItem("BasketMoto"))
    motoStorage = motoStorage.filter(motoObj => motoObj.id !== _id)
    localStorage.setItem("BasketMoto", JSON.stringify(motoStorage))
    basketStore.getBasketMoto()
  }


  function AddMoto() {
    let storage = JSON.parse(localStorage.getItem("BasketMoto"))
    storage = storage.map((moto) => {
      if (moto.id == _id && moto.current < maxCurrent) {
        return {
          id: moto.id,
          current: moto.current + 1
        }
      }
      return {
        id: moto.id,
        current: moto.current
      }
    })
    localStorage.setItem("BasketMoto", JSON.stringify(storage))
    basketStore.getBasketMoto()
  }
  function MinusMoto() {
    let storage = JSON.parse(localStorage.getItem("BasketMoto"))
    storage = storage.map((moto) => {
      if (moto.id == _id && moto.current > minCurrent) {
        return {
          id: moto.id,
          current: moto.current - 1
        }
      }
      return {
        id: moto.id,
        current: moto.current
      }
    })
    localStorage.setItem("BasketMoto", JSON.stringify(storage))
    basketStore.getBasketMoto()
  }


  return (
    <div className="row  mb-2 BasketCard_container">
      <div className="col-12 col-md-3 p-0 card_img d-flex justify-content-center align-items-center">
        <img className="imageCard" src={imgURL[0]} alt="" />
      </div>
      <div className="col  block_info p-2 info_img">
        <div className="w-100">
          <p className="textModel">{brand} - {model}</p>
          <p className="mt-2">{t("shop_page.oneCard.type")} - {collectionType}</p>
          <p className="mt-2">{t("shop_page.oneCard.power")} - {horsepower}</p>
        </div>
        <div className=" w-100">

          <div className="d-flex justify-content-end w-100">
            <a className="close-btn" onClick={Deletemoto}><i className="bi bi-x fs-2"></i></a>
          </div>

          <div className="w-100 d-flex justify-content-between align-items-center">
            <p className="text-center fs-3 price">{clientStore.formatPrice(price * current)}</p>
            <div className="d-flex justify-content-center align-items-center">
              <div onClick={MinusMoto} className="Current_Arrow"><i className="bi bi-caret-left"></i></div>
              <div className="Current_Num">{current}</div>
              <div onClick={AddMoto} className="Current_Arrow"><i className="bi bi-caret-right"></i></div>
            </div>
          </div>
          <div className="btn_group_basket mt-3">
            <button type="button" className="basket_btn">
              <div className="d-flex align-items-center">
                <i className="bi bi-heart p-0 m-0 fs-4 me-1"></i>
                {t("basket_page.addToFavorite")}
              </div>
            </button>
            <NavLink to={`/moto/?id=${_id}`} type="button" className="basket_btn">
              <div className="d-flex align-items-center">
                <i className="bi  bi-gear-fill p-0 m-0 fs-4 me-1"></i>
                {t("basket_page.details")}
              </div>
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  )
})

export default BasketCard