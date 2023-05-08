import './Shop.scss'

import OneCard from '../../components/OneCard/OneCard'
import ShopPagination from '../../components/Pagination/ShopPagination'
import serverStore from '../../store/serverStore'

import { createRef, useEffect, useState } from 'react'
import { observer } from 'mobx-react-lite'
import { toJS } from 'mobx'
// import { toJS } from 'mobx'

const Shop = observer(() => {
    useEffect(() => {
        setSpinerShop("d-block")
        document.title = "Shop - MotoEmporium";
        serverStore.getAllMoto(()=>{
            setSpinerShop("d-none")
        })
    }, [])


    let BrandValue = createRef()
    let ModelValue = createRef()
    let SelectType = createRef()
    let SelectModel = createRef()
    let SortCash = createRef()

    const [ErrorMotoSort,setErrorMotoSort] = useState("")
    const [spinerShop,setSpinerShop] = useState([])

    function sortCash() {
        switch (SortCash.current.value) {
            case "upper":
                serverStore.MotoDataCopy.sort((a, b) => a.price - b.price)
                break;
            case "lower":
                serverStore.MotoDataCopy.sort((a, b) => b.price - a.price)
                break;
        }
    }

    function getMotoNameToType() {
        let arr = toJS(serverStore.MotoData).filter(moto => moto.collectionType == SelectType.current.value)
        let res = []
        for (let i = 0; i < arr.length; i++) {
            res.push(arr[i].model)
        }
        serverStore.ArrTypeName = res
    }


    function sortData() {
        //Пагінація на першу сторінку
        setcurrentPage(1)

        let SortToBrand = BrandValue.current.value
        let SortToModel = ModelValue.current.value
        let SortSelectCatigories = SelectType.current.value
        let SortSelectModel = SelectModel.current.value

        // Сортування по назві бренду
        serverStore.MotoDataCopy = serverStore.MotoData.filter(moto => moto.brand.includes(SortToBrand))
        if (serverStore.MotoDataCopy == false) {
            setErrorMotoSort("Такого бренду немає") 
        } else {setErrorMotoSort("")}
         

        // Сортування по назві моделі
        if (SortToModel) {
            serverStore.MotoDataCopy = serverStore.MotoDataCopy.filter(moto => moto.model.includes(SortToModel))
            if (serverStore.MotoDataCopy == false) {
                setErrorMotoSort("Такої моделі не існує")
            }
        }

        // Сортування по катигоріям
        if (SortSelectCatigories) {
            console.log("SortSelectCatigories");
            if (SortSelectCatigories == "0") {
                serverStore.MotoDataCopy = serverStore.MotoDataCopy.filter(p => true)
            } else {
                serverStore.MotoDataCopy = serverStore.MotoDataCopy.filter(moto => moto.collectionType == SortSelectCatigories)
                if (serverStore.MotoDataCopy == false) {
                setErrorMotoSort("Мотоциклу такого типу немає")
                }
            }
        }

        // Сортування по моделі
        if (SortSelectModel) {
            if (SortSelectCatigories !== "0") {
                console.log("SortSelectModel");
                if (SortSelectModel == "0") {
                    serverStore.MotoDataCopy = serverStore.MotoDataCopy.filter(moto => moto.collectionType == SortSelectCatigories)
                } else {
                    serverStore.MotoDataCopy = serverStore.MotoDataCopy.filter(moto => moto.model == SortSelectModel)
                    if (serverStore.MotoDataCopy == false) {
                        setErrorMotoSort("Мотоциклу з такою назвою у цій категорії немає")
                    }
                }
            }
        }


    }
    function ClearSort() {
        serverStore.getAllMoto()
        BrandValue.current.value = ""
        ModelValue.current.value = ""
        SelectType.current.value = "0"
        SelectModel.current.value = "0"
        setcurrentPage(1)
    }

    // pagination
    const [currentPage, setcurrentPage] = useState(1)
    const [MotoPerPage] = useState(8)

    const lastMotoIndex = currentPage * MotoPerPage
    const firstMotoIndex = lastMotoIndex - MotoPerPage
    const currentMoto = serverStore.MotoDataCopy.slice(firstMotoIndex, lastMotoIndex)

    const paginate = pageNumber => {
        setcurrentPage(pageNumber)
        serverStore.setActiveLink(pageNumber)
    }
    const nextPage = () => {
        if (currentPage < serverStore.lengthPageNumber) {
            setcurrentPage(currentPage + 1)
            serverStore.setActiveLink(serverStore.activeLink + 1)
        }
    }
    const prevPage = () => {
        if (currentPage > 1) {
            setcurrentPage(currentPage - 1)
            serverStore.setActiveLink(serverStore.activeLink - 1)
        }
    }


    return (
        <div className='moto-shop | pt-5 pb-3'>
            <div className='moto-shop__container | container p-4'>
                <div className='moto-shop__controlsWrap | p-4'>
                    <div className='controlsWrap-title'>НАЛАШТУВАННЯ ПОШУКУ</div>

                    <div className='row d-flex align-items-center'>
                        <div className='col-12 col-lg-12 col-xl-4'>
                            {/* inputs */}
                            <input type="text" className="form-control mt-3 mb-3" placeholder="Пошук по марці" ref={BrandValue} />
                            <input type="text" className="form-control mt-4 mb-3" placeholder="Пошук по назві моделі" ref={ModelValue} />
                        </div>

                        <div className='col-12 col-md-6 col-xl-4'>
                            {/* selects */}
                            <select ref={SelectType} onChange={getMotoNameToType} className="form-select mt-3 mb-3">
                                <option defaultValue value="0">Пошук по категоріям/Всі</option>
                                <option value="Sport">Спорт</option>
                                <option value="Adventure">Подорожі</option>
                                <option value="Cruiser">Крейсер</option>
                                <option value="Classic">Класичний</option>
                                <option value="Motard">Мотард</option>
                                <option value="Naked">Найкед</option>
                                <option value="Scrambler">Скремблер</option>
                                <option value="Retro">Ретро</option>
                            </select>
                            <select ref={SelectModel} className="form-select mt-4 mb-3">
                                {
                                    serverStore.ArrTypeName.map((i) => {
                                        return <option key={i} value={i}>{i}</option>
                                    })
                                }
                                <option defaultValue value="0">Тут будуть відображатися мотоцикли по моделі і категорії</option>
                            </select>
                        </div>

                        <div className='col-12 col-md-6 col-xl-4'>
                            {/* buttons */}
                            <div className='d-flex justify-content-center row'>
                                <a className="btn  moto-shop__controls-btnFind | btn btn-warning col-sm-5  mainButton px-4 py-2" role="button" onClick={sortData}>Пошук</a>
                                <button type="button" className="btn btn-warning col-sm-5  mainButton px-4 py-2" onClick={ClearSort}>Очистити фільтри</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='error-shop'>{ErrorMotoSort}</div>
                <div className='moto-shop__supControls | row align-items-center pt-5 pb-4 mb-4'>
                    <div className='col moto-shop__supControls-nowDisplay'>
                        <span>Відображається {currentPage} із {serverStore.lengthPageNumber} сторінок</span>
                    </div>

                    <div className='col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 d-flex justify-content-end'>
                        <select ref={SortCash} onChange={sortCash} className="form-select">
                            <option defaultValue value="0">По ціні</option>
                            <option value="upper">За зростанням</option>
                            <option value="lower">За спаданням</option>
                        </select>
                    </div>
                </div>

                {/* loader */}
                <div className={'d-flex justify-content-center mt-5 ' + spinerShop}>
                    <div className="spinner-border text-warning" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>

                <div className='moto-shop__showcase | row'>
                    {
                        currentMoto.map((p) => {
                            return <OneCard key={p._id} data={p}></OneCard>
                        })
                    }
                </div>

                <div className='d-flex justify-content-center align-items-center'>
                    <ShopPagination
                        MotoPerPage={MotoPerPage}
                        totalMoto={serverStore.MotoDataCopy.length}
                        paginate={paginate}
                        nextPage={nextPage}
                        prevPage={prevPage}
                    ></ShopPagination>
                </div>
            </div>
        </div>
    )
})

export default Shop