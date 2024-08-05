import { CLOUDNARY_IMG_ID } from "../utils/constant";
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
export default Discount;
