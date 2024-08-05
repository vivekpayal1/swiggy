import { useContext } from "react";
import CartContext from "../services/context/cartContext";
import { CLOUDNARY_IMG_ID } from "../utils/constant";

function Cart() {
  const { cartData, setCartData } = useContext(CartContext);
  if (cartData.length <= 0) {
    return <h1>Nothing is there</h1>;
  }
  function handleRemove(i) {
    return () => {
      let newArr = [...cartData];
      newArr.splice(i, 1);
      setCartData(newArr);
      localStorage.setItem("cartData", JSON.stringify(newArr));
    };
  }
  return (
    <div className="w-full">
      <div className="w-[70%] mx-auto bg-red-50">
        {cartData.map((cartItem, i) => {
          return (
            <div className="flex justify-between w-full" key={cartItem.id}>
              <h2 className=" w-[70] text-3xl">{cartItem.name}</h2>
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
      </div>
    </div>
  );
}
export default Cart;
