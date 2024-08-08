import { Link } from "react-router-dom";
import { CLOUDNARY_IMG_ID } from "../utils/constant";

function RestaurantCard({ info, link }) {
  return (
    <Link to={`/restaurantmenu/${link.split("/")[4]}`}>
      <div className="hover:scale-95 duration-300">
        <div className="min-w-[295px] rounded-2xl h-[182px] relative overflow-hidden">
          <img
            className="w-full h-full  object-cover"
            src={`${CLOUDNARY_IMG_ID}${info?.cloudinaryImageId}`}
            loading="lazy"
            alt=""
          />
          <div className="absolute bg-gradient-to-t from-black from-1% to-transparent to-40% top-0 left-0 w-full h-full"></div>
          <p className="absolute bottom-2 left-3 text-white font-extrabold tracking-tighter text-2xl">
            {info?.aggregatedDiscountInfoV3
              ? `${info?.aggregatedDiscountInfoV3?.header} ${info?.aggregatedDiscountInfoV3?.subHeader}`
              : ""}
          </p>
        </div>
        <div className="mt-3">
          <h2 className="text-lg font-semibold">{info?.name}</h2>
          <p className="flex items-center gap-1 font-semibold text-base">
            <i className="fi fi-ss-circle-star text-green-600 text-lg"></i>
            {info?.avgRating} <span>{info?.sla?.slaString}</span>
          </p>
          <p className="line-clamp-1 text-black/60 font-medium">
            {info?.cuisines?.join(", ")}
          </p>
          <p className="line-clamp-1 text-black/60 font-medium">
            {info?.locality}
          </p>
        </div>
      </div>
    </Link>
  );
}
export default RestaurantCard;
