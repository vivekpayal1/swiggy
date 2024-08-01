import RestaurantCard from "./RestaurantCard";

function OnlineFoodDelivery({ data }) {
  return (
    <div>
      Restaurants with online food delivery in Delhi
      <div className="grid grid-cols-4 gap-10">
        {data.map(({ info, cta: { link } }) => {
          return <RestaurantCard info={info} key={info?.id} link={link} />;
        })}
      </div>
    </div>
  );
}
export default OnlineFoodDelivery;
