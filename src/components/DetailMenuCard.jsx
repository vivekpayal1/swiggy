
import { useDispatch } from "react-redux";

import { useState } from "react";

import { CLOUDNARY_IMG_ID } from "../utils/constant";
import { clearCartItem } from "../services/slices/cartSlice";

import { vegIcon, nonVegIcon } from "../utils/constant";
import AddToCartButton from "./AddToCartButton";

function DetailMenuCard({ data, resInfo }) {


  const [isShow, isShowSet] = useState(false);
  const [isDiffrent, setIsDiffrent] = useState(false)
  const {
    name,
    price,
    defaultPrice,
    itemAttribute,

    ratings: {
      aggregatedRating: { rating, ratingCountV2 },
    },
    description,
    imageId,
  } = data.card.info;
  const dispatch = useDispatch();
  function handleShow() {
    isShowSet((isSHowPrev) => !isSHowPrev);
  }
  function handleIsDiffrent() {
    setIsDiffrent(prev => !prev)
  }
  function handleClearCart() {
    dispatch(clearCartItem());
    localStorage.setItem("cartData", JSON.stringify([]));
    // setIsDiffrent(prev => !prev)

  }
  let trimDescription = description?.substring(0, 140) + "...";

  return (
    <div>
      <div className="flex flex-col-reverse sm:flex-row gap-6 md:gap-0 w-full justify-between">
        <div className="">
          <img
            className="w-6 rounded-sm"
            src={itemAttribute && itemAttribute.vegClassifier === "VEG" ? vegIcon : nonVegIcon}
            alt=""
          />
          <h2 className="font-bold text-lg my-1">{name}</h2>
          <p className="font-bold">
            ₹ {Math.floor(defaultPrice / 100 || price / 100)}
          </p>
          {rating ? (
            <p className="flex items-center gap-1">
              <i className="fi fi-sr-star text-green-700 text-xs "></i>{" "}
              <div className="flex gap-1 items-center my-1">
                <span className="font-bold text-sm">{rating}</span>{" "}
                <span className="text-sm">({ratingCountV2})</span>
              </div>
            </p>
          ) : (
            ""
          )}
          <div className="max-w-[85%]">
            {description?.length > 140 ? (
              <div>
                <span className=" w-full text-gray-600 mt-2">
                  {isShow ? description : trimDescription}
                </span>
                <button
                  className="font-bold text-gray-600 ml-1"
                  onClick={handleShow}
                >
                  {isShow ? "less" : "more"}
                </button>
              </div>
            ) : (
              <span className=" w-full text-gray-600 mt-2">{description}</span>
            )}
          </div>
        </div>
        <div>
          <div className="w-full sm:w-[156px] h-[140px] overflow-hidden rounded-lg relative">
            <img
              src={`${CLOUDNARY_IMG_ID}${imageId}`}
              className="h-full w-full object-cover"
              alt=""
            />
            <AddToCartButton data={data} resInfo={resInfo} />

          </div>
        </div>
      </div>
      <hr className=" my-5" />
      {
        isDiffrent && <div className="z-20 w-[520px] p-8 h-[200px] shadow-xl fixed bottom-2 bg-white left-1/2 -translate-x-1/2">
          <h4 className="font-base font-bold text-[20px]">Items already in cart</h4>
          <p className="font-sm mt-2">Your cart contains items from other restaurant. Would you like to reset your cart for adding items from this restaurant?</p>
          <div className="grid grid-cols-2 gap-4 mt-4">
            <button type="button" onClick={handleIsDiffrent} className="border-2 text-[#60b246] font-bold border-[#60b246] h-12">No</button>
            <button className=" bg-[#60b246] font-bold text-white" onClick={handleClearCart}>Yes, start afresh</button>
          </div>
        </div>
      }
    </div>
  );
}
export default DetailMenuCard;
