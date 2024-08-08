export function Shimmer() {
    return <div className="w-full">
        <div className="bg-slate-900 w-full h-[350px] flex justify-center items-center flex-col gap-6">
            <div role="status " className="relative">
                <svg aria-hidden="true" className="w-20 h-2w-20 text-white/80 animate-spin dark:text-white/70 fill-white" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                </svg>
                <img className="w-10 absolute top-[50%] left-1/2 -translate-x-1/2 -translate-y-1/2" src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/icecream_wwomsa" alt="" />
            </div>
            <h2 className=" text-xl text-center md:text-3xl font-semibold text-white">Looking for great food near you...</h2>
        </div>
        <div className="w-[90%] sm:w-[70%] mx-auto mt-6">
            <div className="grid grid-col-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-10">
                {Array(20).fill('').map((_, i) => {
                    return <div key={i}>
                        <div className="animate-pulse">
                            <div className="h-[200px] bg-gray-300 w-full rounded-2xl"></div>
                        </div>
                        <div className="animate-pulse mt-4">
                            <div className="h-2.5 bg-gray-200 rounded-full w-48 mb-3"></div>
                            <div className="h-2 bg-gray-200 rounded-full max-w-[330px] mb-2.5"></div>
                            <div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>
                            <div className="h-2 bg-gray-200 rounded-full max-w-[160px] mb-2.5"></div>
                        </div>
                    </div>
                })}
            </div>
        </div>
    </div>
}
export function MenuShimmer() {
    return <div className="w-[85%] md:max-w-[800px] mx-auto mt-6">
        <div className="grid grid-col-1 sm:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-2 gap-10">
            {Array(6).fill('').map((_, i) => {
                return <div key={i}>
                    <div className="animate-pulse">
                        <div className="h-[200px] bg-gray-100 w-full rounded-2xl"></div>
                    </div>
                    <div className="animate-pulse mt-4">
                        <div className="h-2.5 bg-gray-100 rounded-full w-48 mb-3"></div>
                        <div className="h-2 bg-gray-100 rounded-full max-w-[330px] mb-2.5"></div>
                        <div className="h-2 bg-gray-100 rounded-full mb-2.5"></div>
                        <div className="h-2 bg-gray-100 rounded-full max-w-[160px] mb-2.5"></div>
                    </div>
                </div>
            })}


        </div>
    </div>
}
