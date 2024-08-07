import { CLOUDNARY_IMG_ID } from "../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { clearCartItem, removeCartItem } from "../services/slices/cartSlice";
import toast from "react-hot-toast";
import { useState } from "react";
import { toggleLogin } from "../services/slices/toggleSlice";
import { vegIcon, nonVegIcon } from "../utils/constant";

function Cart() {
  const cartData = useSelector((store) => store.cartSlice.cartItems);
  const resInfo = useSelector((store) => store.cartSlice.resInfo);
  const [isShow, isShowSet] = useState(false);
  const dispatch = useDispatch()




  const userData = useSelector(store => store.authSlice.userData)


  const totalPrice = cartData.reduce((acc, item) => {
    return acc + item.price / 100 || item.defaultPrice / 100;
  }, 0);

  if (cartData.length <= 0) {
    return <h1>Nothing is there</h1>;
  }
  function handleClearCart() {
    dispatch(clearCartItem());
    localStorage.setItem("cartData", JSON.stringify([]));
  }
  function handleShow() {
    isShowSet((isSHowPrev) => !isSHowPrev);
  }
  function handleRemove(i) {
    return () => {
      if (cartData.length > 1) {
        let newArr = [...cartData];
        newArr.splice(i, 1);
        dispatch(removeCartItem(newArr));
      }
    };
  }
  function handlePlaceOrder() {
    if (!userData) {
      toast.error('Login First')
      dispatch(toggleLogin())
      return
    }
    toast.success('Order Placed')
  }
  return (
    <div className="w-full">
      <div className="w-[85%] md:max-w-[800px] md:w-full mx-auto">
        <div className="flex gap-5 mt-4 shadow-sm ">
          <img
            className="rounded-xl aspect-square w-40"
            src={CLOUDNARY_IMG_ID + resInfo.cloudinaryImageId}
            alt=""
          />

          <div>
            <p className="text-2xl font-bold ">{resInfo.name}</p>
            <span className="mt-2 block">{resInfo.areaName}</span>
          </div>
        </div>





        {cartData.map((data, i) => {

          const { name,
            id,
            price,
            defaultPrice,
            itemAttribute: { vegClassifier = "" },

            ratings: {
              aggregatedRating: { rating, ratingCountV2 },
            },
            description,
            imageId, } = data
          let trimDescription = description?.substring(0, 140) + "...";
          return <div key={id} className="mt-5">
            <div className="flex flex-col-reverse  gap-6 md:gap-0 w-full justify-between"  >
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
                <div className="w-full md:w-[156px] h-[140px] overflow-hidden rounded-lg relative">
                  <img
                    src={`${CLOUDNARY_IMG_ID}${imageId}`}
                    className="h-full w-full object-cover"
                    alt=""
                  />

                  <button
                    className="shadow-md absolute -bottom-1 left-1/2 -translate-x-1/2 bg-white text-red-500 font-extrabold text-[18px] rounded-lg w-[85%] py-1"
                    onClick={handleRemove(i)}
                  >
                    Remove
                  </button>

                </div>
              </div>
            </div>
            <hr className=" my-5" />
            <div>
              <h1>Total Price - ₹{totalPrice}</h1>
              <div className="flex justify-between">
                <button onClick={handlePlaceOrder}> Place Order</button>
                <button onClick={handleClearCart}>Clear Cart</button>
              </div>
            </div>

          </div>

        })}
      </div>
    </div>
  );
}
export default Cart;
