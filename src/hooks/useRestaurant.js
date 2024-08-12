import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

function useRestaurant() {
  const [offersData, setoffersData] = useState([]);
  const [topRestaurantData, setTopRestaurantData] = useState([]);
  const [topResTitle, settopResTitle] = useState("");
  const [onlineTitle, setOnlineTitle] = useState("");
  const [failData, setFailData] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const coord = useSelector((store) => store.coordinates);
  const { lat, lng } = coord;
  
  useEffect(() => {
    fetchData();
  }, [lat, lng]);

  async function fetchData() {
    setIsLoading(true);
    const data = await fetch(
      `${import.meta.env.VITE_SWIGGY_URL}restaurants/list/v5?lat=${lat}&lng=${lng}&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING`,
    );
    const response = await data.json();
    setFailData(response.data);

    setTopRestaurantData(
      response?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle
        ?.restaurants,
    );
    setoffersData(response?.data?.cards[0]?.card?.card?.imageGridCards?.info);
    settopResTitle(response?.data?.cards[1]?.card?.card?.header?.title);
    setOnlineTitle(response?.data?.cards[2]?.card?.card?.title);
    setIsLoading(false);
  }

  return [
    offersData,
    topRestaurantData,
    topResTitle,
    onlineTitle,
    failData,
    isLoading,
  ];
}

export default useRestaurant;
