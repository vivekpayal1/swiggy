import { useContext, useState } from "react";
import { CLOUDNARY_IMG_ID } from "../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import CartContext from "../services/context/cartContext";
import { setCartItem } from "../services/slices/cartSlice";
const vegIcon =
  "https://i.pinimg.com/736x/e4/1f/f3/e41ff3b10a26b097602560180fb91a62.jpg";
const nonVegIcon =
  "https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Non_veg_symbol.svg/220px-Non_veg_symbol.svg.png";

function DetailMenuCard({ data, resInfo }) {
  let cartPageData = data.card.info;
  const cartData = useSelector((store) => store.cartSlice.cartItems);
  const [isShow, isShowSet] = useState(false);
  const {
    name,
    id,
    price,
    defaultPrice,
    itemAttribute: { vegClassifier = "" },

    ratings: {
      aggregatedRating: { rating, ratingCountV2 },
    },
    description,
    imageId,
  } = data.card.info;
  const resLocalStorageInfo = useSelector((store) => store.cartSlice.resInfo);
  const dispatch = useDispatch();
  function handleAddToCard() {
    const isAdded = cartData.find((data) => data.id === id);
    if (!isAdded) {
      if (
        resLocalStorageInfo.name === resInfo.name ||
        resLocalStorageInfo.length === 0
      ) {
        dispatch(setCartItem({ cartPageData, resInfo }));
      } else {
        console.log("first");
      }
    } else {
      alert("HEllo");
    }
  }
  function handleShow() {
    isShowSet((isSHowPrev) => !isSHowPrev);
  }
  let trimDescription = description?.substring(0, 140) + "...";

  return (
    <div>
      <div className="flex w-full justify-between">
        <div className="">
          <img
            className="w-6 rounded-sm"
            src={vegClassifier === "VEG" ? vegIcon : nonVegIcon}
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
          <div className="w-[156px] h-[140px] overflow-hidden rounded-lg relative">
            <img
              src={`${CLOUDNARY_IMG_ID}${imageId}`}
              className="h-full w-full"
              alt=""
            />
            <button
              className="shadow-md absolute -bottom-1 left-1/2 -translate-x-1/2 bg-white text-green-500 font-extrabold text-[18px] rounded-lg w-[85%] py-1"
              onClick={handleAddToCard}
            >
              ADD
            </button>
          </div>
        </div>
      </div>
      <hr className=" my-5" />
    </div>
  );
}
export default DetailMenuCard;
