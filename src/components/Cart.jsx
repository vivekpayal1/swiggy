import { CLOUDNARY_IMG_ID } from "../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { clearCartItem, removeCartItem } from "../services/slices/cartSlice";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function Cart() {
  const cartData = useSelector((store) => store.cartSlice.cartItems);
  const resInfo = useSelector((store) => store.cartSlice.resInfo);

  const userData = useSelector(store => store.authSlice.userData)
  const dispatch = useDispatch();
  const navigate = useNavigate()

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
      navigate('/')
      return
    }
    toast.success('Order Placed')
  }
  return (
    <div className="w-full">
      <div>
        <img
          className="rounded-xl aspect-square"
          src={CLOUDNARY_IMG_ID + resInfo.cloudinaryImageId}
          alt=""
        />
      </div>
      <div className="w-[50%] mx-auto">
        {cartData.map((cartItem, i) => {
          return (
            <div
              className="flex w-full justify-between my-5 p-2"
              key={cartItem.id}
            >
              {" "}
              <div className=" w-[70]">
                <h2 className=" text-3xl">{cartItem.name}</h2>
                <p>₹{cartItem.price / 100 || cartItem.defaultPrice / 100}</p>
              </div>
              <div className="w-[20%] relative h-full">
                <img
                  className="rounded-xl aspect-square"
                  src={CLOUDNARY_IMG_ID + cartItem.imageId}
                  alt=""
                />
                <button
                  className="shadow-md absolute -bottom-1 left-1/2 -translate-x-1/2 text-white bg-red-500 font-extrabold text-[18px] rounded-lg w-[85%] py-1"
                  onClick={handleRemove(i)}
                >
                  Remove
                </button>
              </div>
            </div>
          );
        })}

        <h1>Total Price - ₹{totalPrice}</h1>
        <button onClick={handlePlaceOrder}> Place Order</button>
        <button onClick={handleClearCart}>Clear Cart</button>
      </div>
    </div>
  );
}
export default Cart;
