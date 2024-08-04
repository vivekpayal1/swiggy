import { useContext, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { CLOUDNARY_IMG_ID } from "../utils/constant";
import Coordinates from "../services/context/coordinates";
const vegIcon =
  "https://i.pinimg.com/736x/e4/1f/f3/e41ff3b10a26b097602560180fb91a62.jpg";
const nonVegIcon =
  "https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Non_veg_symbol.svg/220px-Non_veg_symbol.svg.png";

function RestaurantMenu() {
  const { id } = useParams();
  let menuId = id.split("-").at(-1);
  const [slideInitialValue, setslideInitialValue] = useState(0);
  const [menuData, setMenuData] = useState([]);
  const [resInfo, setResInfo] = useState([]);
  const [discountData, setDiscountData] = useState([]);
  const [topPicksSlider, setTopPicksSlider] = useState(null);
  const {
    coord: { lat, lng },
  } = useContext(Coordinates);
  console.log(lat, lng);
  useEffect(() => {
    fetchMenu();
  }, []);
  async function fetchMenu() {
    const response = await fetch(
      `https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=${lat}&lng=${lng}&restaurantId=${menuId}&catalog_qa=undefined&submitAction=ENTER`
    );
    // const data = 'https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=28.7040592&lng=77.10249019999999&restaurantId=10392&catalog_qa=undefined&submitAction=ENTER'
    const data = await response.json();
    setResInfo(data?.data?.cards[2]?.card?.card?.info);
    console.log(data?.data?.cards[2]?.card?.card?.info);
    setDiscountData(
      data?.data?.cards[3]?.card?.card?.gridElements?.infoWithStyle?.offers
    );
    let actualMenuData =
      data?.data?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards?.filter(
        (data) => data.card.card.itemCards || data.card.card.categories
      );
    setMenuData(actualMenuData);

    const topPicksSliderData =
      data?.data?.cards[4]?.groupedCard?.cardGroupMa?.REGULAR?.cards?.filter(
        (data) => data.card.card.title == "Top Picks"
      );
    setTopPicksSlider(topPicksSliderData);
  }

  function handleNext() {
    slideInitialValue >= 60
      ? ""
      : setslideInitialValue((prevValue) => prevValue + 25);
  }
  function handlePrev() {
    slideInitialValue <= 0
      ? ""
      : setslideInitialValue((prevValue) => prevValue - 25);
  }
  return (
    <>
      <div className="w-full">
        <div className=" max-w-[800px] w-full mx-auto">
          <div className="text-[#93959f] text-xs py-4">
            <span>
              <Link to="/">Home</Link>
            </span>
            {`${resInfo?.city}/`}
            <span className="text-[#535665] ml-1">{resInfo?.name}</span>
          </div>
          <h1 className="font-bold text-2xl py-6">{resInfo?.name}</h1>
          <div className="w-full bg-custom-gradient px-4 pb-4 rounded-lg">
            <div className="shadow-sm border border-slate-200/40 bg-white  pb-3 rounded-lg">
              <div className="px-3">
                <div className="flex items-center font-semibold gap-1">
                  <i className="fi fi-ss-circle-star text-green-600 text-lg mt-1"></i>
                  <span>{resInfo?.avgRating}</span>
                  <span>({resInfo?.totalRatingsString})</span>.
                  <span>{resInfo?.costForTwoMessage}</span>
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
                {/* {resInfo.length !== 0 ? (
                  <span>
                    {resInfo?.expectationNotifiers[0]?.enrichedText?.replace(
                      /<\/?b>/g,
                      ""
                    )}
                    Order above 149 for discounted delivery fee
                  </span>
                ) : (
                  ""
                )} */}
              </div>
            </div>
          </div>
          <div className="w-full overflow-hidden">
            <div className="flex justify-between mt-8">
              <h2 className="text-2xl text-black font-extrabold">
                Deals for you
              </h2>
              <div className="flex items-center gap-3">
                <div
                  className={`${
                    slideInitialValue <= 0
                      ? "opacity-40 bg-gray-200"
                      : "bg-gray-200"
                  }  rounded-full flex justify-center items-center w-9 h-9 cursor-pointer`}
                  onClick={handlePrev}
                >
                  <i className="fi fi-rr-arrow-small-left text-2xl mt-2"></i>
                </div>
                <div
                  className={`${
                    slideInitialValue >= 60
                      ? "opacity-40 bg-gray-200"
                      : "bg-gray-200"
                  } rounded-full flex justify-center items-center w-9 h-9 cursor-pointer`}
                  onClick={handleNext}
                >
                  <i className="fi fi-rr-arrow-small-right text-2xl mt-2"></i>
                </div>
              </div>
            </div>
            <div
              className="flex items-center gap-6 mt-4 duration-1000"
              style={{ translate: `-${slideInitialValue}%` }}
            >
              {discountData?.map((data, index) => {
                return <Discount data={data} key={index} />;
              })}
            </div>
          </div>
          <h2 className="mt-5 text-center leading-5">MENU</h2>
          <div className="w-full mt-5">
            <div className="w-full cursor-pointer text-center items-center relative p-4 font-semibold text-xl rounded-lg bg-slate-200/40">
              Search for Dishes{" "}
              <i className="fi fi-rr-search absolute top-3 right-4 mt-1"></i>
            </div>
          </div>

          {topPicksSlider && (
            <div className="w-full overflow-hidden">
              <div className="flex justify-between mt-8">
                <h2 className="text-2xl text-black font-extrabold">
                  {topPicksSlider[0]?.card?.card?.title}
                </h2>
                <div className="flex items-center gap-3">
                  <div
                    className={`${
                      slideInitialValue <= 0
                        ? "opacity-40 bg-gray-200"
                        : "bg-gray-200"
                    }  rounded-full flex justify-center items-center w-9 h-9 cursor-pointer`}
                    onClick={handlePrev}
                  >
                    <i className="fi fi-rr-arrow-small-left text-2xl mt-2"></i>
                  </div>
                  <div
                    className={`${
                      slideInitialValue >= 60
                        ? "opacity-40 bg-gray-200"
                        : "bg-gray-200"
                    } rounded-full flex justify-center items-center w-9 h-9 cursor-pointer`}
                    onClick={handleNext}
                  >
                    <i className="fi fi-rr-arrow-small-right text-2xl mt-2"></i>
                  </div>
                </div>
              </div>
              <div
                className="flex items-center gap-6 mt-4 duration-1000"
                style={{ translate: `-${slideInitialValue}%` }}
              >
                {topPicksSlider[0]?.card?.card?.carousel.map((data) => {
                  const {
                    creativeId,
                    dish: {
                      info: { id, defaultPrice, price },
                    },
                  } = data;

                  return (
                    <div key={id} className="flex gap-4">
                      <div className="min-w-[400px] h-[405px] relative">
                        <img
                          className="w-full h-full"
                          src={`${CLOUDNARY_IMG_ID}${creativeId}`}
                          alt=""
                        />
                        <div className="absolute bottom-4 flex justify-between w-full items-center px-4 ">
                          <p className="text-white font-bold">
                            ₹{defaultPrice / 100 || price / 100}
                          </p>
                          <button className="shadow-md px-10 py-2 bg-white text-green-500 font-extrabold text-[18px] rounded-lg">
                            ADD{" "}
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          <div>
            {menuData?.map(({ card: { card } }, index) => {
              return <MenuCard card={card} key={index} />;
            })}
          </div>
        </div>
      </div>
    </>
  );
}

function MenuCard({ card } = {}) {
  let isTrue = false;
  if (card["@type"]) {
    isTrue = true;
  }
  const [isOpen, setIsOpen] = useState(isTrue);
  function handleDropDown() {
    setIsOpen((prev) => !prev);
  }
  if (card.itemCards) {
    const { title, itemCards } = card;
    return (
      <>
        <div className="mt-7">
          <div className="flex justify-between items-center my-4">
            <h1
              className={`font-bold ${card["@type"] ? "text-xl" : "text-base"}  `}
            >
              {title} ({itemCards.length})
            </h1>
            <i
              className={`fi  ${isOpen ? "fi-rr-angle-small-up" : "fi-rr-angle-small-down"} text-2xl`}
              onClick={handleDropDown}
            ></i>
          </div>
          <DetailsMenu itemCards={itemCards} isOpen={isOpen} />
        </div>
        <hr
          className={`my-5 ${card["@type"] ? "[9px]" : "[4px]"} [&:not(:last-child)]:border-${card["@type"] ? "[9px]" : "[4px]"}`}
        />
      </>
    );
  } else {
    const { title, categories } = card;
    return (
      <div className="mt-4">
        <h1 className="font-bold text-xl">{title}</h1>
        {categories.map((data, index) => {
          return <MenuCard card={data} key={index} />;
        })}
      </div>
    );
  }
}
function DetailsMenu({ itemCards, isOpen }) {
  return (
    <>
      {isOpen && (
        <div>
          {itemCards.map((data) => {
            const { id } = data.card.info;
            return <DetailMenuCard data={data} key={id} />;
          })}
        </div>
      )}
    </>
  );
}
function DetailMenuCard({ data }) {
  const [isShow, isShowSet] = useState(false);
  const {
    name,
    price,
    defaultPrice,
    itemAttribute: { vegClassifier = "" },

    ratings: {
      aggregatedRating: { rating, ratingCountV2 },
    },
    description,
    imageId,
  } = data.card.info;
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
            <button className="shadow-md absolute -bottom-1 left-1/2 -translate-x-1/2 bg-white text-green-500 font-extrabold text-[18px] rounded-lg w-[85%] py-1">
              ADD{" "}
            </button>
          </div>
        </div>
      </div>
      <hr className=" my-5" />
    </div>
  );
}

function Discount({ data } = {}) {
  const { header, couponCode, offerLogo } = data.info;
  return (
    <div className="min-w-[328px] flex gap-4 border broder-slate-700 rounded-xl px-4 py-3">
      <img
        className="w-14 h-14 object-contain"
        src={`${CLOUDNARY_IMG_ID}${offerLogo}`}
        alt=""
      />
      <div>
        <h4 className="font-extrabold text-[20px]">{couponCode}</h4>
        <p className="font-extrabold text-sm text-gray-600">{header}</p>
      </div>
    </div>
  );
}
export default RestaurantMenu;
