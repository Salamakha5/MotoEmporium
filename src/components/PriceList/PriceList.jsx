import "./PriceList.scss"
import { observer } from 'mobx-react-lite'
import clientStore from "../../store/clientStore"

const PriceList = observer((props) => {
    return <li className="fs-5 mt-1">{props.moto.brand}/{props.moto.model} <span className="currentMoto">X{props.moto.current}</span> - {clientStore.formatPrice(props.moto.price * props.moto.current)}</li>
})

export default PriceList