
import { Route, Routes } from "react-router-dom";
import Body from "./components/Body";
import Header from "./components/Header";
import RestaurantMenu from "./components/RestaurantMenu";
import Cart from "./components/Cart";
import { useSelector } from "react-redux";
import Signin from "./components/SinginBtn";
import SearchBar from "./components/SearchBar";

function App() {
  const isVisible = useSelector((store) => store.toggleSlice.searchToggle);
  return (
    <div className={`${isVisible ? "max-h-screen overflow-hidden" : ""}`}>
      <Routes>
        <Route path="/" element={<Header />}>
          <Route path="/" element={<Body />} />
          <Route path="/restaurantmenu/:id" element={<RestaurantMenu />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/search" element={<SearchBar />} />
          <Route path="/signin" element={<Signin />} />

        </Route>
      </Routes>
    </div>
    // </CartContext.Provider>
  );
}
export default App;
