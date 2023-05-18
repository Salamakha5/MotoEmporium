import "./PriceList.scss"
import { observer } from 'mobx-react-lite'
import React, { useEffect, useState } from 'react'
import clientStore from "../../store/clientStore"
import basketStore from "../../store/basketStore"

const PriceList = observer((props) => {
    return <li className="fs-5 mt-1">{props.moto.brand}/{props.moto.model} - {clientStore.formatPrice(props.moto.price * props.moto.current)}</li>
})

export default PriceList