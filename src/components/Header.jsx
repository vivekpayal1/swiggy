function Header() {
  return (
    <div className="w-full shadow-md h-20 flex justify-center items-center">
      <div className="w-[70%] flex justify-between items-center">
        <div className="flex items-center gap-3">
          <a href="#">
            <img
              src="https://1000logos.net/wp-content/uploads/2021/05/Swiggy-emblem.png"
              alt="logo"
              className="w-24"
            />
          </a>
          <p className="flex items-center gap-3 cursor-pointer">
            <span className="font-bold text-sm border-b-2 pb-1 border-b-black">
              Others
            </span>
            <i className="fi fi-rs-angle-small-down text-2xl text-[#fc8019]"></i>
          </p>
        </div>
        <nav>
          <ul className="flex items-center gap-8">
            <li>
              <a
                href="#"
                className="flex gap-3 items-center text-[#3d4152] font-semibold"
              >
                <i className="fi fi-rr-briefcase"></i>
                <span>Swiggy Corporate</span>
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex gap-3 items-center text-[#3d4152] font-semibold"
              >
                <i className="fi fi-rr-search"></i>
                Search
              </a>
            </li>{" "}
            <li>
              <a
                href="#"
                className="flex gap-3 items-center text-[#3d4152] font-semibold"
              >
                <i className="fi fi-rr-badge-percent"></i>
                Offers
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex gap-3 items-center text-[#3d4152] font-semibold"
              >
                <i className="fi fi-rr-info"></i>
                Help
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex gap-3 items-center text-[#3d4152] font-semibold"
              >
                <i className="fi fi-rs-user"></i>
                Sign In
              </a>
            </li>      <li>
              <a
                href="#"
                className="flex gap-3 items-center text-[#3d4152] font-semibold"
              >
               <i className="fi fi-rr-shopping-cart-add"></i>
                Cart
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}
export default Header;
