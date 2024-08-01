import { Outlet, Link } from "react-router-dom";
import { navItems } from "../utils/constant";
function Header() {
  return (
    <>
      <div className="w-full shadow-md h-20 flex justify-center items-center">
        <div className="w-[70%] flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Link to="/">
              <img
                src="https://1000logos.net/wp-content/uploads/2021/05/Swiggy-emblem.png"
                alt="logo"
                className="w-24"
              />
            </Link>
            <p className="flex items-center gap-3 cursor-pointer">
              <span className="font-bold text-sm border-b-2 pb-1 border-b-black">
                Others
              </span>
              <i className="fi fi-rs-angle-small-down text-2xl text-[#fc8019]"></i>
            </p>
          </div>
          <nav>
            <ul className="flex items-center gap-12">
              {navItems?.map((navItem) => {
                return (
                  <li key={navItem?.id}>
                    <a
                      href="#"
                      className="flex gap-3 items-center text-[#3d4152] font-semibold"
                    >
                      <i className={`fi ${navItem?.navIcon} mt-1`}></i>
                      <span>{navItem?.name}</span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      </div>
      <Outlet />
    </>
  );
}
export default Header;
