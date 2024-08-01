import { Route, Routes } from "react-router-dom";
import Body from "./components/Body";
import Header from "./components/Header";
import RestaurantMenu from "./components/RestaurantMenu";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Header />}>
        <Route path="/" element={<Body />} />
        <Route path="/restaurantmenu/:id" element={<RestaurantMenu />} />
      </Route>

      {/* <Header />
      <Body /> */}
    </Routes>
  );
}
export default App;
