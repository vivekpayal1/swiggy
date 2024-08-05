import { useEffect, useState } from "react";
import { json, Route, Routes } from "react-router-dom";
import Body from "./components/Body";
import Header from "./components/Header";
import RestaurantMenu from "./components/RestaurantMenu";
import Cart from "./components/Cart";
import VisibleContext from "./services/context/visibleContext";
import Coordinates from "./services/context/coordinates";
import CartContext from "./services/context/cartContext";

function App() {
  const [isVisible, setIsVisible] = useState(false);
  const [coord, setCoord] = useState({
    lat: 28.7040592,
    lng: 77.10249019999999,
  });
  const [cartData, setCartData] = useState([]);

  function getDataFromLocalStorage() {
    let data = JSON.parse(localStorage.getItem("cartData")) || []
    setCartData(data);
  }
  useEffect(() => {
    getDataFromLocalStorage();
  }, []);
  return (
    <CartContext.Provider value={{ cartData, setCartData }}>
      <Coordinates.Provider value={{ coord, setCoord }}>
        <VisibleContext.Provider value={{ isVisible, setIsVisible }}>
          <div className={`${isVisible ? "max-h-screen overflow-hidden" : ""}`}>
            <Routes>
              <Route path="/" element={<Header />}>
                <Route path="/" element={<Body />} />
                <Route
                  path="/restaurantmenu/:id"
                  element={<RestaurantMenu />}
                />
                <Route path="/cart" element={<Cart />} />
              </Route>
            </Routes>
          </div>
        </VisibleContext.Provider>
      </Coordinates.Provider>
    </CartContext.Provider>
  );
}
export default App;
