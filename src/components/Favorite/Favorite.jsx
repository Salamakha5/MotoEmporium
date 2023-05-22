import { NavLink } from "react-router-dom"
import "./Favorite.scss"
import React from 'react'
import { observer } from "mobx-react-lite"
import basketStore from "../../store/basketStore"

const Favorite = observer((props) => {
    function DeleteFavMoto(){
        let motoStorage = JSON.parse(localStorage.getItem("FavoriteMoto"))
        motoStorage = motoStorage.filter(motoObj => motoObj !== props.data._id)
        localStorage.setItem("FavoriteMoto", JSON.stringify(motoStorage))
        basketStore.getFavoriteMoto()
    }
    return (
        <div className="favorite_container || col-10 col-sm-4 col-md-4 col-lg-3  m-2 p-0 pb-2">
            <NavLink  to={`/moto/?id=${props.data._id}`}>
                <img className="w-100" src={props.data.imgURL[0]} alt="" />
            </NavLink>
            <div className="d-flex justify-content-between align-items-center">
                <div className="fav_text || ms-2 ">{props.data.brand}/</div>
                <div className="close_btn ||"><i onClick={DeleteFavMoto} className="bi bi-x fs-3"></i></div>
            </div>
            <div>
                <div className=" fav_text || ms-2">{props.data.model}</div>
            </div>
        </div>
    )
})

export default Favorite