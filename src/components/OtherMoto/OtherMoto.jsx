import "./OtherMoto.scss"

import serverStore from '../../store/serverStore'
import clientStore from '../../store/clientStore'

import { observer } from 'mobx-react-lite'
import { NavLink } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

const OtherMoto = observer((props) => {

    const { t } = useTranslation();

    function clickHandler() {
        serverStore.getMotoById(props.data._id)
        serverStore.getAllMoto(() => {
            serverStore.updateThreeMotos(serverStore.MotoData)
        })
    }

    return (
        <div className='col-12 col-sm-6 col-md-4 '>
            {
                props.data ?
                    // <NavLink onClick={() => serverStore.getMotoById(props.data._id)} to={`/moto/?id=${props.data._id}`} >
                    <NavLink onClick={clickHandler} to={`/moto/?id=${props.data._id}`} >
                        <div className="OtherMoto" data-hover-text={t('oneMoto_page.img-data-text-goTo')}>
                            <div className='OtherMoto__imgCont'>
                                <img src={props.data.imgURL[1]} />
                            </div>
                            <div className='OtherMoto__title'>{props.data.model}</div>
                            <div className='OtherMoto__price'>{clientStore.formatPrice(props.data.price)}</div>
                        </div>
                    </NavLink>
                    : false
            }
        </div>

    )
})

export default OtherMoto