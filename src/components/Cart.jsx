import { useContext } from "react";
import CartContext from "../services/context/cartContext";
import { CLOUDNARY_IMG_ID } from "../utils/constant";

function Cart() {
  const { cartData, setCartData } = useContext(CartContext);
  return (
    <div className="w-full">
      <div className="w-[70%] mx-auto bg-red-50">
        {cartData.map((cartItem) => {
          console.log(cartItem);
          return (
            <div>
              <h2>{cartItem.name}</h2>
              <img src={CLOUDNARY_IMG_ID + cartItem.imageId} alt="" />
            </div>
          );
        })}
      </div>
    </div>
  );
}
export default Cart;
