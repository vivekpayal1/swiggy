import { useState } from "react";
import RestaurantCard from "./RestaurantCard";

function TopRestaurantSlide({ data }) {
  const [topRestaurantSlide, setTopRestaurantSlide] = useState(0);
  function handlePrev() {
    topRestaurantSlide <= 0
      ? ""
      : setTopRestaurantSlide((prevValue) => prevValue - 30);
  }
  function handleNext() {
    setTopRestaurantSlide((prevValue) => prevValue + 30);
  }

  return (
    <div className="mt-4">
      <div className="mt-5">
        <div className="flex justify-between">
          <h2 className="text-2xl text-black font-extrabold">
            Top restaurant chains in Roorkee
          </h2>
          <div className="flex items-center gap-3">
            <div
              className={`${
                topRestaurantSlide <= 0
                  ? "opacity-40 bg-gray-200"
                  : "bg-gray-200"
              }  rounded-full flex justify-center items-center w-9 h-9 cursor-pointer`}
              onClick={handlePrev}
            >
              <i className="fi fi-rr-arrow-small-left text-2xl mt-2"></i>
            </div>
            <div
              className={`${
                topRestaurantSlide >= 120
                  ? "opacity-40 bg-gray-200"
                  : "bg-gray-200"
              } rounded-full flex justify-center items-center w-9 h-9 cursor-pointer`}
              onClick={handleNext}
            >
              <i className="fi fi-rr-arrow-small-right text-2xl mt-2"></i>
            </div>
          </div>
        </div>
        <div
          className={`flex w-full gap-5 duration-1000 mt-6`}
          style={{ translate: `-${topRestaurantSlide}%` }}
        >
          {data.map(({ info, cta: { link } }) => {
            return <RestaurantCard info={info} key={info?.id} link={link} />;
          })}
        </div>
      </div>
      <hr className="border mt-4" />
    </div>
  );
}
export default TopRestaurantSlide;
