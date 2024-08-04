import { useContext, useEffect, useState } from "react";
import Offers from "./Offers";
import TopRestaurant from "./TopRestaurant";
import OnlineFoodDelivery from "./OnlineFoodDelivery";
import Coordinates from "../services/context/coordinates";
import { CLOUDNARY_IMG_ID } from "../utils/constant";

function Body() {
  const [offersData, setoffersData] = useState([]);
  const [topRestaurantData, setTopRestaurantData] = useState([]);
  const [topResTitle, settopResTitle] = useState("");
  const [onlineTitle, setOnlineTitle] = useState("");
  const [failData, setFailData] = useState({});

  const {
    coord: { lat, lng },
  } = useContext(Coordinates);

  async function fetchData() {
    const data = await fetch(
      `https://www.swiggy.com/dapi/restaurants/list/v5?lat=${lat}&lng=${lng}&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING`
    );
    const response = await data.json();
    setFailData(response.data);

    setTopRestaurantData(
      response?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle
        ?.restaurants
    );
    setoffersData(response?.data?.cards[0]?.card?.card?.imageGridCards?.info);
    settopResTitle(response?.data?.cards[1]?.card?.card?.header?.title);
    setOnlineTitle(response?.data?.cards[2]?.card?.card?.title);
  }
  useEffect(() => {
    fetchData();
  }, [lat, lng]);

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

  return (
    <div className="w-full">
      <div className="w-[75%] mx-auto overflow-hidden">
        <Offers data={offersData} />
        <TopRestaurant data={topRestaurantData} title={topResTitle} />
        <OnlineFoodDelivery data={topRestaurantData} title={onlineTitle} />
      </div>
    </div>
  );
}
export default Body;
