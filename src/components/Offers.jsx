import { useState } from "react";
import { CLOUDNARY_IMG_ID } from "../utils/constant";

function Offers({ data }) {
  const [slideInitialValue, setslideInitialValue] = useState(0);
  function handleNext() {
    slideInitialValue >= 120
      ? ""
      : setslideInitialValue((prevValue) => prevValue + 30);
  }
  function handlePrev() {
    slideInitialValue <= 0
      ? ""
      : setslideInitialValue((prevValue) => prevValue - 30);
  }
  return (
    <>
      <div className="mt-5">
        <div className="flex justify-between">
          <h2 className="text-2xl text-black font-extrabold">
            What&#39;s on your mind?
          </h2>
          <div className="flex items-center gap-3">
            <div
              className={`${
                slideInitialValue <= 0
                  ? "opacity-40 bg-gray-200"
                  : "bg-gray-200"
              }  rounded-full flex justify-center items-center w-9 h-9 cursor-pointer`}
              onClick={handlePrev}
            >
              <i className="fi fi-rr-arrow-small-left text-2xl mt-2"></i>
            </div>
            <div
              className={`${
                slideInitialValue >= 120
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
          style={{ translate: `-${slideInitialValue}%` }}
          className={`flex duration-1000`}
        >
          {data?.map((item) => {
            return (
              <img
                key={item.id}
                className="w-40"
                src={`${CLOUDNARY_IMG_ID}${item.imageId}`}
                alt=""
              />
            );
          })}
        </div>
      </div>
      <hr className="border my-12 border-gray-100" />
    </>
  );
}
export default Offers;
