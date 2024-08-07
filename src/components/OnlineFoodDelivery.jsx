import { useState } from "react";
import { filterBtns } from "../utils/constant";
import RestaurantCard from "./RestaurantCard";
import { useDispatch } from "react-redux";
import { setFilterValue } from "../services/slices/filterSlice";

function OnlineFoodDelivery({ data = [], title = '' } = {}) {
  const [activeBtn, setActiveBtn] = useState(null)

  const dispatch = useDispatch()

  function handleFilterBtn(btnLabel) {
    return () => {
      setActiveBtn(activeBtn === btnLabel ? null : btnLabel)
    }
  }
  dispatch(setFilterValue(activeBtn))

  return (
    <div>
      <h2 className="text-2xl text-black font-extrabold py-6">{title}</h2>
      <div className="flex flex-wrap mb-6 gap-3">
        {
          filterBtns?.map((btn) => {
            const { id, btnLabel } = btn
            return <button onClick={handleFilterBtn(btnLabel)} key={id} className="border flex gap-2 rounded-full bg-white px-4 shadow-sm py-2 font-semibold">{btnLabel}
              <i className={`fi mt-1 text-sm fi-br-cross ${activeBtn === btnLabel ? 'visible' : 'hidden'}`}></i></button>
          })
        }

      </div>
      <div className="grid grid-col-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-10">
        {data?.map(({ info, cta: { link } }) => {
          return <RestaurantCard info={info} key={info?.id} link={link} />;
        })}
      </div>
    </div>
  );
}
export default OnlineFoodDelivery;
