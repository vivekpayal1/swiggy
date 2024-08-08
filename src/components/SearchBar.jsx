import { useEffect, useState } from "react"

import { searchFilterBtns } from '../utils/constant'
import Dishes from "./Dishes"
import SearchRestaurantData from "./SearchRestaurantData"
import { useSelector } from "react-redux"

function SearchBar() {
    const [searchQuery, setSearchQuery] = useState('')
    const [activeFilter, setActiveFilter] = useState('Dishes')
    const [dishes, setDishes] = useState([])
    const [RestaurantData, setRestaurantData] = useState([])

    useEffect(() => {
        if (searchQuery === '') {
            return
        }
        let id = setTimeout(() => {
            fetchDishesData()
            fetchRestaurantData()
        }, 1000)
        return () => {
            clearTimeout(id)
        }
    }, [searchQuery])

    const coord = useSelector((store) => store.coordinates);
    const { lat, lng } = coord;



    async function fetchRestaurantData() {
        const response = await fetch(`https://www.swiggy.com/dapi/restaurants/search/v3?lat=${lat}&lng=${lng}&str=${searchQuery}&trackingId=undefined&submitAction=ENTER&queryUniqueId=09382834-acfe-5c99-a337-42a7454017c1&selectedPLTab=RESTAURANT`)
        const data = await response.json()
        const mainRestaurantData = (data?.data?.cards[0]?.groupedCard?.cardGroupMap?.RESTAURANT?.cards).filter(data => data?.card?.card?.info)
        setRestaurantData(mainRestaurantData)

    }
    async function fetchDishesData() {
        const response = await fetch(`https://www.swiggy.com/dapi/restaurants/search/v3?lat=28.5355161&lng=77.3910265&str=${searchQuery}&trackingId=a4783fd0-37bc-38ad-f7aa-5e37d71c88d9&submitAction=ENTER&queryUniqueId=2b8988dd-0737-37f4-6dc8-c889ef05562e`)
        const data = await response.json()
        const mainDishesData = (data?.data?.cards[1]?.groupedCard?.cardGroupMap?.DISH?.cards).filter(data => data?.card?.card?.info)
        setDishes(mainDishesData)
    }

    function handleSearch(e) {
        setSearchQuery(e.target.value.trim())
    }
    function handleSetFilter(btnLable) {
        return () => {
            setActiveFilter(btnLable === activeFilter ? null : btnLable)
        }
    }
    const UUID = crypto.randomUUID();



    return <div className="w-full md:w-[1200px] mx-auto mt-6">
        <input type="text" onChange={handleSearch} value={searchQuery} placeholder="Search for Restaurant Food" className="border-2 px-10 py-5 focus:outline-none w-full" />

        <div className="flex flex-wrap gap-3 mt-4">
            {
                searchFilterBtns?.map((btn) => {
                    const { id = UUID, btnLabel = '' } = btn || {}
                    return <button key={id} className="border flex gap-2 rounded-full bg-white px-4 shadow-sm py-2 font-semibold" onClick={handleSetFilter(btnLabel)}>{btnLabel}
                        <i className={`fi mt-1 text-sm fi-br-cross ${activeFilter === btnLabel ? 'visible' : 'hidden'}`}></i>
                    </button>
                })
            }
        </div>
        <div className="w-[90%] mx-auto md:max-w-[1200px] md:w-full bg-gray-200/50 mt-4">
            {
                activeFilter === "Dishes" ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-6 px-4">
                        {dishes?.map((data) => {
                            const { id } = data?.card?.card?.info
                            return < Dishes data={data} key={id} />
                        })}
                    </div>
                ) :
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-6 px-4">
                        {
                            (RestaurantData?.map((restaurantItem) => {
                                const { id } = restaurantItem?.card?.card?.info
                                return <SearchRestaurantData restaurantItem={restaurantItem} key={id} />
                            }
                            ))
                        }
                    </div>

            }
        </div>
    </div >
} export default SearchBar