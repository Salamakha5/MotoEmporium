import './OneOrder.scss'
import { observer } from 'mobx-react-lite'

import React, { useState } from 'react'

const OneOrder = observer(() => {
    const [FullOrderInfo, setFullOrderInfo] = useState()
    function OpenFullOrder() {
        if (FullOrderInfo) {

            setFullOrderInfo(!FullOrderInfo)
        }
        else { setFullOrderInfo(!FullOrderInfo) }
    }
    return (
        <div className='oneOrder_container || row '>
            <div className="col d-flex justify-content-center align-items-center">
                <div>
                    <div className='num_order || mb-1'>№283492</div>
                    <div className='username || mt-1'>Саламаха Владислав Ол.</div>
                </div>
            </div>
            <div className="col">
                <div className="text-end">Дата зам.- <span className='date_order'>20.12.23</span></div>
                <div className='d-flex mt-2 justify-content-end align-items-center'>
                    <button className='btn mainButton justify-content-end align-items-center'
                        onClick={OpenFullOrder}
                    ><i class="bi bi-gear-fill me-1"></i>Деталі</button>
                </div>
            </div>
            {/* orderFull */}
            {
                FullOrderInfo ?
                    <div className='orderFull'>
                        <p className='pb-2 fs-5'>ПІБ : Саламаха Влад Олександрович</p>
                        <p className='fs-5 mb-2'>Статус - Пакування...</p>
                        <span>Список замовлення:</span>
                        <ol className='mt-2'>
                            <li>Ducati Monster - 12,000$ (X 3)</li>
                            <li>Ducati Monster - 12,000$ (X 2)</li>
                            <li>Ducati Monster - 12,000$ (X 1)</li>
                        </ol>
                        <div className='text_Discount | text-end mb-2'>Знижка 20%</div>
                        <div className='text-end'>Загальна сумма - <span className='text_Price'>40,000$</span></div>
                        <div className='d-flex mt-3 justify-content-between align-items-center'>
                            <p className='fs-5'>Тех. Нормер - +38012345678</p>
                            <button className='mainButton p-2'>Відмінити замовлення</button>
                        </div>
                    </div>
                    :
                    false
            }
            {/* orderFull */}


        </div>
    )
})

export default OneOrder