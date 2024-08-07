function SearchRestaurantData({ restaurantItem } = {}) {
    console.log(restaurantItem)
    const { id, name, avgRating, cloudinaryImageId, costForTwo, aggregatedDiscountInfoV3: { header = "", subHeader = "" } = '', promoted = false, cuisines, sla: { slaString }
    } = restaurantItem.card.card.info

    return <div>
        <h1>{name}</h1>
    </div>
}
export default SearchRestaurantData