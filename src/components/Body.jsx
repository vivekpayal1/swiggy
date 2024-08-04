import { useContext, useEffect, useState } from "react";
import Offers from "./Offers";
import TopRestaurant from "./TopRestaurant";
import OnlineFoodDelivery from "./OnlineFoodDelivery";
import Coordinates from "../services/context/coordinates";

function Body() {
  const [offersData, setoffersData] = useState([]);
  const [topRestaurantData, setTopRestaurantData] = useState([]);
  const {
    coord: { lat, lng },
  } = useContext(Coordinates);
  console.log(lat, lng);

  async function fetchData() {
    const data = await fetch(
      `https://www.swiggy.com/dapi/restaurants/list/v5?lat=${lat}&lng=${lng}&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING`
    );
    const response = await data.json();
    setTopRestaurantData(
      response?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle
        ?.restaurants
    );
    setoffersData(response?.data?.cards[0]?.card?.card?.imageGridCards?.info);
  }
  useEffect(() => {
    fetchData();
  }, [lat, lng]);
  return (
    <div className="w-full">
      <div className="w-[75%] mx-auto overflow-hidden">
        <Offers data={offersData} />
        <TopRestaurant data={topRestaurantData} />
        <OnlineFoodDelivery data={topRestaurantData} />
      </div>
    </div>
  );
}
export default Body;
