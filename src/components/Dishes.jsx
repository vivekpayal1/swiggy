function Dishes({ data } = {}) {
    const { id: dishItemId, name, imageId = "", price, isVeg = 0 } = data?.card?.card?.info
    const { name: resName, avgRating, id, sla: { slaString } } = data?.card?.card?.restaurant?.info

    return <div key={dishItemId} className="bg-white px-2 py-4 rounded-xl">
        <div className="flex justify-between">
            <div className="flex flex-col gap-2">
                <p>{resName}</p>
                <p><i className="fi fi-ss-star"></i> {avgRating}{slaString}</p>
            </div>
            <i className="fi fi-rr-arrow-small-right text-2xl"></i>
        </div>
        <div className="mt-4">
            <h2 className="font-bold ">{name}</h2>
        </div>
    </div>
}
export default Dishes