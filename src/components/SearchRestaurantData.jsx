import { CLOUDNARY_IMG_ID } from "../utils/constant"

function SearchRestaurantData({ restaurantItem } = {}) {
    const { id, name, avgRating, cloudinaryImageId, costForTwo, aggregatedDiscountInfoV3: { header = "", subHeader = "" } = '', promoted = false, cuisines, sla: { slaString }
    } = restaurantItem.card.card.info

    return <div className="grid grid-cols-[140px_1fr] gap-4 overflow-hidden bg-white rounded-xl items-center px-3 py-4">
        <div className="h-[96px] overflow-hidden rounded-lg w-full">
            <img loading="lazy" className="h-full w-full" src={`${CLOUDNARY_IMG_ID}${cloudinaryImageId}`} alt="" />
        </div>

        <div className="w-full">
            <h2 className="font-bold mb-1 text-[20px] text-black/80">{name}</h2>
            <div className="flex gap-2 text-[#696b79] font-semibold mb-1">
                <span> <i className="fi mt-1 fi-ss-star"></i> {avgRating}</span>
                <span>{slaString}</span>
                <span>{costForTwo} {subHeader}</span>
            </div>
            <p className="text-black/60 line-clamp-2">{cuisines.join(',')}</p>
        </div>


    </div>
}
export default SearchRestaurantData