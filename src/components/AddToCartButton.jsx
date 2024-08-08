import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";

import { useState } from "react";

import { setCartItem } from "../services/slices/cartSlice";

function AddToCartButton({ data, resInfo }) {

    const { id } = data.card.info;
    const [isDiffrent, setIsDiffrent] = useState(false)
    const cartData = useSelector((store) => store.cartSlice.cartItems);
    const resLocalStorageInfo = useSelector((store) => store.cartSlice.resInfo);
    const dispatch = useDispatch();

    let cartPageData = data.card.info;


    function handleAddToCard() {
        const isAdded = cartData.find((data) => data.id === id);
        if (!isAdded) {
            if (
                resLocalStorageInfo.name === resInfo.name ||
                resLocalStorageInfo.length === 0
            ) {
                dispatch(setCartItem({ cartPageData, resInfo }));
                toast.success('Added To Cart')
            } else {
                toast.error('Different Restaurant')
                setIsDiffrent(prev => !prev)

            }
        } else {
            toast.error('Already Added!', {
                duration: 2000,
                position: 'top-right',
            })
        }
    }


    return <button
        className="shadow-md absolute -bottom-1 left-1/2 -translate-x-1/2 bg-white text-green-500 font-extrabold text-[18px] rounded-lg w-[85%] py-1" onClick={handleAddToCard}>
        ADD
    </button>
}
export default AddToCartButton