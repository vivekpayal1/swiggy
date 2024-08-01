import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { CLOUDNARY_IMG_ID } from "../utils/constant";

function RestaurantMenu() {
  const { id } = useParams();
  let menuId = id.split("-").at(-1);
  const [menuData, setMenuData] = useState([]);
  const [resInfo, setResInfo] = useState([]);
  const [discount, setDiscountData] = useState([]);
  console.log(resInfo);
  useEffect(() => {
    fetchMenu();
  }, []);
  async function fetchMenu() {
    const response = await fetch(
      `https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=30.3164945&lng=78.03219179999999&restaurantId=${menuId}&catalog_qa=undefined&submitAction=ENTER`
    );
    const data = await response.json();
    // console.log(
    //   data.data.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards[2]?.card
    //     ?.card?.itemCards
    // );
    setResInfo(data?.data?.cards[2]?.card?.card?.info);
    setDiscountData(
      data?.data?.cards[3]?.card?.card?.gridElements?.infoWithStyle?.offers
    );
    setMenuData(
      data.data.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards[2]?.card
        ?.card?.itemCards
    );
  }
  return (
    <>
      <div className="w-full">
        <div className=" max-w-[800px] w-full mx-auto">
          <div className="text-[#93959f] text-xs py-4">
            <span>
              <Link to="/">Home</Link>
            </span>
            / {`${resInfo.city}/`}
            <span className="text-[#535665] ml-1">{resInfo.name}</span>
          </div>
          <h1 className="font-bold text-2xl py-6">{resInfo?.name}</h1>
          <div className="w-full bg-custom-gradient px-4 pb-4 rounded-lg">
            <div className="shadow-sm border border-slate-200/40 bg-white  pb-3 rounded-lg">
              <div className="px-3">
                <div className="flex items-center font-semibold gap-1">
                  <i className="fi fi-ss-circle-star text-green-600 text-lg mt-1"></i>
                  <span>{resInfo.avgRating}</span>
                  <span>({resInfo.totalRatingsString})</span>.
                  <span>{resInfo.costForTwoMessage}</span>
                </div>
                <p className="underline font-bold text-orange-600 text-sm py-1">
                  {resInfo?.cuisines?.join(",")}
                </p>
                <div className="flex mt-2 gap-2">
                  <div className="flex flex-col w-[7px] items-center">
                    <div className="w-[7px] h-[7px] bg-gray-300 rounded-full"></div>
                    <div className="w-[1px] h-8 bg-gray-300"></div>
                    <div className="w-[7px] h-[7px] bg-gray-300 rounded-full"></div>
                  </div>
                  <div className="flex flex-col justify-between">
                    <p className="font-semibold text-sm line leading-none">
                      Outlet{" "}
                      <span className="text-gray-500 text-xs ml-2">
                        {resInfo?.locality}
                      </span>
                    </p>
                    <p className="font-semibold text-sm leading-none">
                      {resInfo?.sla?.slaString}
                    </p>
                  </div>
                </div>
              </div>
              <hr className="border border-slate-200/40 my-3" />
              <div className="px-3 flex items-center gap-2 text-sm font-semibold text-gray-500">
                <img
                  src={`${CLOUDNARY_IMG_ID}${resInfo?.feeDetails?.icon}`}
                  alt=""
                  className="w-5"
                />
                {resInfo.length !== 0 ? (
                  <span>
                    {resInfo?.expectationNotifiers[0]?.enrichedText}Order above
                    149 for discounted delivery fee
                  </span>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default RestaurantMenu;
