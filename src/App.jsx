import { Route, Routes } from "react-router-dom";
import Body from "./components/Body";
import Header from "./components/Header";
import RestaurantMenu from "./components/RestaurantMenu";
import VisibleContext from "./services/context/visibleContext";
import { useState } from "react";
import Coordinates from "./services/context/coordinates";

function App() {
  const [isVisible, setIsVisible] = useState(false);
  const [coord, setCoord] = useState({
    lat: 28.7040592,
    lng: 77.10249019999999,
  });
  return (
    <Coordinates.Provider value={{ coord, setCoord }}>
      <VisibleContext.Provider value={{ isVisible, setIsVisible }}>
        <div className={`${isVisible ? "max-h-screen overflow-hidden" : ""}`}>
          <Routes>
            <Route path="/" element={<Header />}>
              <Route path="/" element={<Body />} />
              <Route path="/restaurantmenu/:id" element={<RestaurantMenu />} />
            </Route>
          </Routes>
        </div>
      </VisibleContext.Provider>
    </Coordinates.Provider>
  );
}
export default App;
