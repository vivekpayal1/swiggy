import Offers from "./Offers";
import TopRestaurant from "./TopRestaurant";
import OnlineFoodDelivery from "./OnlineFoodDelivery";
import { useSelector } from "react-redux";
import { Shimmer } from "./Shimmer";
import useRestaurant from "../hooks/useRestaurant";

function Body() {

  const [offersData, topRestaurantData, topResTitle, onlineTitle, failData, isLoading] = useRestaurant()
  const filterVal = useSelector(store => store.filterSlice.filterVal)
  const filterData = topRestaurantData?.filter(item => {
    if (!filterVal) return true
    switch (filterVal) {
      case 'Ratings 4.0+': return item.info.avgRating > 4
      case 'Rs. 300-Rs. 600': return item.info.costForTwo.slice(1, 4) >= '300' && item.info.costForTwo.slice(1, 4) <= '600'
      case 'Less than Rs. 300': return item.info.costForTwo.slice(1, 4) >= '300'
      default: return true
    }
  })
  if (failData.communication) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="flex justify-center flex-col items-center">
          <img
            src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_476,h_476/portal/m/location_unserviceable.png`}
            alt=""
            className="w-96"
          />
          <h1 className="text-2xl font-extrabold">Location Unservicable</h1>
          <p className="text-center mt-2 font-semibold text-gray-500">
            We don’t have any services here till now. Try changing location.
          </p>
        </div>
      </div>
    );
  }
  if (isLoading) {
    return <Shimmer />
  }

  return (
    <div className="w-full">
      <div className="w-[90%] md:w-[75%] mx-auto overflow-hidden">
        <Offers data={offersData} />
        <TopRestaurant data={topRestaurantData} title={topResTitle} />
        <OnlineFoodDelivery data={filterVal ? filterData : topRestaurantData} title={onlineTitle} />
      </div>
    </div>
  );
}
export default Body;
