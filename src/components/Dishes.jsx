import { vegIcon, nonVegIcon, CLOUDNARY_IMG_ID } from "../utils/constant"
import AddToCartButton from "./AddToCartButton"

function Dishes({ data } = {}) {
    const { id: dishItemId, name, imageId = "", price, isVeg = 0 } = data?.card?.card?.info
    const { name: resName, avgRating, id, sla: { slaString } } = data?.card?.card?.restaurant?.info

    return <div key={dishItemId} className="bg-white px-2 py-4 rounded-xl">
        <div className="flex justify-between">
            <div className="flex flex-col gap-2">
                <p className="text-xs font-semibold text-gray-700">{resName}</p>
                <p className="flex text-sm items-center gap-1 font-semibold"><i className="fi mt-1 fi-ss-star"></i> {avgRating} . {slaString}</p>
            </div>
            <i className="fi fi-rr-arrow-small-right text-2xl"></i>
        </div>
        <hr className="border-gray/40 border-b-[1px] border-dashed mt-3 " />
        <div className="mt-4 flex justify-between">
            <div className="w-6/12">
                <div className="w-6 my-3">
                    {
                        isVeg ? < img src={vegIcon} alt="" /> : <img src={nonVegIcon} alt="" />
                    }
                </div>
                <h2 className="font-bold text-black/80 text-[19px]">{name}</h2>
                <span className="font-bold flex items-center">₹{price / 100}</span>
                <button className="border borrer-gray px-4 py-2 rounded-full text-xs mt-2 ">More Details</button>
            </div>

            <div className="w-6/12 sm:w-[156px] h-[140px] overflow-hidden rounded-lg relative">
                {imageId && <img
                    src={`${CLOUDNARY_IMG_ID}${imageId}`}
                    className="h-full w-full object-cover"
                    loading="lazy"
                    alt=""
                />}
                <AddToCartButton data={data.card} resInfo={data?.card?.card?.restaurant?.info} />
            </div>
        </div>
    </div>
}
export default Dishes