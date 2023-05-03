import "./otherMoto.scss"

import { observer } from 'mobx-react-lite'
import { NavLink } from 'react-router-dom'
import serverStore from '../../store/serverStore'

const OtherMoto = observer((props) => {
    return (
        <div className='col'>
            {
                props.data ?
                    <NavLink onClick={() => serverStore.getMotoById(props.data._id)} to={`/moto/?id=${props.data._id}`} >
                        <div>
                            <div className='d-flex justify-content-center align-items-center'>
                                <img src={props.data.imgURL[1]} className=' OtherMoto_Img' alt="" />
                            </div>
                            <p className='text-center mt-2'>{props.data.model}</p>
                            <p className='text-center text-warning'>${props.data.price}</p>
                        </div>
                    </NavLink>
                    : false
            }
        </div>

    )
})

export default OtherMoto