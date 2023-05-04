import "./OtherMoto.scss"

import serverStore from '../../store/serverStore'

import { observer } from 'mobx-react-lite'
import { NavLink } from 'react-router-dom'

const OtherMoto = observer((props) => {
    return (
        <div className='col-4'>
            {
                props.data ?
                    <NavLink onClick={() => serverStore.getMotoById(props.data._id)} to={`/moto/?id=${props.data._id}`} >
                        <div className="OtherMoto" data-hover-text="Дивитись">
                            <div className='OtherMoto__imgCont'>
                                <img src={props.data.imgURL[1]} />
                            </div>
                            <div className='OtherMoto__title'>{props.data.model}</div>
                            <div className='OtherMoto__price'>${props.data.price}</div>
                        </div>
                    </NavLink>
                    : false
            }
        </div>

    )
})

export default OtherMoto