import RestaurantCard from "./RestaurantCard";

function OnlineFoodDelivery({ data }) {
  return (
    <div>
      Restaurants with online food delivery in Delhi
      <div className="flex">
        {data.map(({ info }) => {
          return <RestaurantCard info={info} key={info?.id} />;
        })}
      </div>
    </div>
  );
}
export default OnlineFoodDelivery;
