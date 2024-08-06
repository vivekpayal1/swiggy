import { Outlet, Link } from "react-router-dom";
import { navItems } from "../utils/constant";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleLogin, toggleSearch } from "../services/slices/toggleSlice";
import { setCoords } from "../services/slices/coordinatesSlice";

function Header() {
  const dispatch = useDispatch();
  const isVisible = useSelector((store) => store.toggleSlice.searchToggle);
  const cartData = useSelector((st) => st.cartSlice.cartItems);
  const [cities, setCities] = useState([]);
  const [searchData, setSearchData] = useState("");
  const [address, setAddress] = useState("");

  const userData = useSelector(store => store.authSlice.userData)
  useEffect(() => {
    const searchDebounce = setTimeout(() => {
      getCities();
    }, 500);
    return () => {
      clearTimeout(searchDebounce);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchData]);
  function handleSearchCities(e) {
    setSearchData(e.target.value);
  }

  function handleSearch() {
    dispatch(toggleSearch());
  }
  function handleLogin() {
    dispatch(toggleLogin());
  }
  function handleHide() {
    dispatch(toggleSearch());
  }
  function handlePrevent(e) {
    e.stopPropagation();
  }

  async function getCities() {
    const response = await fetch(
      `https://www.swiggy.com/dapi/misc/place-autocomplete?input=${searchData}`
    );
    const data = await response.json();
    setCities(data.data);
  }

  async function handleLongLat(id) {
    const response = await fetch(
      `https://www.swiggy.com/dapi/misc/address-recommend?place_id=${id}`
    );
    const data = await response.json();
    dispatch(
      setCoords({
        lat: data?.data[0]?.geometry?.location?.lat,
        lng: data?.data[0]?.geometry?.location?.lng,
      })
    );



    setAddress(data.data[0].formatted_address);
    dispatch(toggleSearch());
  }
  useEffect(() => {
    handleLongLat();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div
        className={`h-full bg-black/40 w-full fixed z-10 ${isVisible ? "visible" : "invisible"}`}
        onClick={handleHide}
      >
        <div
          className={`p-5 bg-white flex justify-end text-black w-[750px] transition-all duration-300 h-full z-20 absolute ${isVisible ? "left-0" : "-left-[100%]"}`}
          onClick={handlePrevent}
        >
          <div className="w-[50%]">
            <div
              className="mb-5 mt-2 cursor-pointer"
              onClick={() => {
                dispatch(toggleSearch());
              }}
            >
              <i className="fi fi-ss-cross"></i>
            </div>
            <input
              type="text"
              className="border h-[60px] pr-16 w-full border-gray-400 p-4 focus:outline-none focus:shadow-md"
              onChange={handleSearchCities}
              placeholder="Search for area, street name.."
            />

            {searchData && (
              <ul className="border border-[#d4d5d9] px-4 py-4 mt-4">
                {cities?.map((city, index) => {
                  const {
                    structured_formatting: { main_text, secondary_text },
                    place_id,
                  } = city;
                  return (
                    <div className="my-5" key={index}>
                      <div className="flex gap-4">
                        <i className="fi fi-rr-marker mt-1"></i>
                        <li
                          key={place_id}
                          onClick={() => handleLongLat(place_id)}
                          className="w-full"
                        >
                          <p className="font-bold">{main_text}</p>
                          <p className="text-sm opacity-65 mt-1">
                            {secondary_text}

                            <span className="opacity-90 mt-3 border block border-gray-400/80 border-dashed"></span>
                          </p>
                        </li>
                      </div>
                    </div>
                  );
                })}
              </ul>
            )}
          </div>
        </div>
      </div>
      <div
        className={`h-full bg-black/40 w-full fixed z-10 ${isVisible ? "visible" : "invisible"}`}
        onClick={handleHide}
      >
        <div
          className={`p-5 bg-white flex justify-end text-black w-[750px] transition-all duration-300 h-full z-20 absolute ${isVisible ? "left-0" : "-left-[100%]"}`}
          onClick={handlePrevent}
        >
          <div className="w-[50%]">
            <div
              className="mb-5 mt-2 cursor-pointer"
              onClick={() => {
                dispatch(toggleSearch());
              }}
            >
              <i className="fi fi-ss-cross"></i>
            </div>
            <input
              type="text"
              className="border h-[60px] pr-16 w-full border-gray-400 p-4 focus:outline-none focus:shadow-md"
              onChange={handleSearchCities}
              placeholder="Search for area, street name.."
            />

            {searchData && (
              <ul className="border border-[#d4d5d9] px-4 py-4 mt-4">
                {cities?.map((city, index) => {
                  const {
                    structured_formatting: { main_text, secondary_text },
                    place_id,
                  } = city;
                  return (
                    <div className="my-5" key={index}>
                      <div className="flex gap-4">
                        <i className="fi fi-rr-marker mt-1"></i>
                        <li
                          key={place_id}
                          onClick={() => handleLongLat(place_id)}
                          className="w-full"
                        >
                          <p className="font-bold">{main_text}</p>
                          <p className="text-sm opacity-65 mt-1">
                            {secondary_text}

                            <span className="opacity-90 mt-3 border block border-gray-400/80 border-dashed"></span>
                          </p>
                        </li>
                      </div>
                    </div>
                  );
                })}
              </ul>
            )}
          </div>
        </div>
      </div>

      <div className="w-full shadow-md h-20 flex justify-center items-center">
        <div className="w-[70%] flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Link to="/">
              <img
                src="https://1000logos.net/wp-content/uploads/2021/05/Swiggy-emblem.png"
                alt="logo"
                className="w-24"
              />
            </Link>
            <p
              className="flex items-center gap-2 cursor-pointer"
              onClick={handleSearch}
            >
              <p className="text-sm flex gap-1 items-center">
                <span className="font-bold pb-1 border-b-2 border-b-black/90 text-black mr-1">
                  Others
                </span>{" "}
                {address && (
                  <span className="line-clamp-1 max-w-[250px]">{address}</span>
                )}
              </p>
              <i className="fi fi-rs-angle-small-down text-2xl text-[#fc8019]"></i>
            </p>
          </div>
          <nav>
            <ul className="flex items-center gap-12">
              {navItems?.map((navItem) => {
                return (
                  <li key={navItem?.id}>
                    <div className="flex">
                      {navItem.name === "Sign In" ? <div
                        onClick={handleLogin}
                        className="flex cursor-pointer gap-3 items-center text-[#3d4152] font-semibold"
                      >
                        {userData ? <img src={userData?.photo} alt={''} /> : <i className={`fi ${navItem?.navIcon} mt-1`}></i>}
                        <span>{userData ? userData?.name : navItem.name}</span>
                      </div> : <Link
                        to={`${navItem.path}`}
                        className="flex gap-3 items-center text-[#3d4152] font-semibold"
                      >
                        {<i className={`fi ${navItem?.navIcon} mt-1`}></i>}
                        <span>{navItem?.name}</span>
                      </Link>}

                      {cartData.length > 0
                        ? navItem.name == "Cart" && <p>{cartData.length}</p>
                        : ""}
                    </div>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      </div>
      <Outlet />
    </>
  );
}
export default Header;
