import "./oneProduct.scss"
import { observer } from "mobx-react-lite";
const OneProduct = observer((props)=>{
    console.log(props.data.imgURL[0]);
    return <div className="oneCard_count col-3 d-flex justify-content-center mt-3">
        <div className="m-1 p-3 cardMoto w-100 h-100 ">
            <div className="imgCont">
            <img className="w-100 h-100" src={props.data.imgURL[0]} alt="" />
            </div>
            <p className="pt-3">{props.data.brand} {props.data.model}</p>
            <p className="pt-3 oneCard_price">${props.data.price}</p>
            <div className="d-flex p-3 pb-0 ps-2 align-items-center">
                <div>Колекція:</div>
                <div className="ms-2 fs-5">{props.data.collectionType}</div>
            </div>
            <div className="d-flex p-3 pb-0 ps-2 align-items-center">
                <div>Кінських сил:</div>
                <div className="ms-2 fs-5">{props.data.horsepower}</div>
            </div>
            <div className="mt-3 d-flex justify-content-center align-items-center">
            <button type="button" className="btn btn-warning">Деталі</button>
            </div>
        </div>
    </div>
})
export default OneProduct