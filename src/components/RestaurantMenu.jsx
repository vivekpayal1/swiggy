import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function RestaurantMenu() {
    const { id } = useParams();
    let menuId = id.split('-').at(-1)
  const [menuData, setMenuData] = useState([]);
  console.log(menuData)
  useEffect(() => {
    fetchMenu();
  }, []);
  async function fetchMenu() {
    const response = await fetch(
      `https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=30.3164945&lng=78.03219179999999&restaurantId=${menuId}&catalog_qa=undefined&submitAction=ENTER`
    );
    const data = await response.json();
    console.log(data.data.cards[0].card.card.text)
    setMenuData(data);
  }
  return <h1>Hello{id}</h1>;
}
export default RestaurantMenu;
