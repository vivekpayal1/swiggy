
import { useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";

import { lazy, Suspense } from "react";

import Body from "./components/Body";
import Header from "./components/Header";
import Cart from "./components/Cart";
import Signin from "./components/SinginBtn";
const SearchBar = lazy(() => import('./components/SearchBar.jsx'))
const RestaurantMenu = lazy(() => import('./components/RestaurantMenu.jsx'))


function App() {
  const isVisible = useSelector((store) => store.toggleSlice.searchToggle);
  return (
    <div className={`${isVisible ? "max-h-screen overflow-hidden" : ""}`}>
      <Routes>
        <Route path="/" element={<Header />}>
          <Route path="/" element={<Body />} />
          <Route path="/restaurantmenu/:id" element={
            <Suspense fallback="Loading....">
              <RestaurantMenu />
            </Suspense>} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/search" element={
            <Suspense fallback="Loading....">
              <SearchBar />
            </Suspense>
          } />
          <Route path="/signin" element={<Signin />} />

        </Route>
      </Routes>
    </div>
  );
}
export default App;
