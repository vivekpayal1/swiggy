import { useEffect, useState } from "react";
import Offers from "./Offers";
import TopRestaurant from "./TopRestaurant";
import { RESTRAUNT_API } from "../utils/constant";
import OnlineFoodDelivery from "./OnlineFoodDelivery";

function Body() {
  const [offersData, setoffersData] = useState([]);
  const [topRestaurantData, setTopRestaurantData] = useState([]);
  console.log(offersData);

  async function fetchData() {
    const data = await fetch(RESTRAUNT_API);
    const response = await data.json();
    setTopRestaurantData(
      response?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle
        ?.restaurants
    );
    setoffersData(response?.data?.cards[0]?.card?.card?.imageGridCards?.info);
  }
  useEffect(() => {
    fetchData();
  }, []);
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
