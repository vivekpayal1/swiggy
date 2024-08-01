import RestaurantCard from "./RestaurantCard";

function OnlineFoodDelivery({ data }) {
  return (
    <div>
      <h2 className="text-2xl text-black font-extrabold py-6">
        Restaurants with online food delivery in Delhi
      </h2>
      <div className="grid grid-cols-4 gap-10">
        {data?.map(({ info, cta: { link } }) => {
          return <RestaurantCard info={info} key={info?.id} link={link} />;
        })}
      </div>
    </div>
  );
}
export default OnlineFoodDelivery;
