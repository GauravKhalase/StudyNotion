import { useEffect, useState } from "react";
import { AiFillDownCircle, AiOutlineShoppingCart } from "react-icons/ai";
import { RxCross2 } from "react-icons/rx";
import { BsChevronDown } from "react-icons/bs";
import { BiMenuAltRight } from "react-icons/bi";
import { useSelector } from "react-redux";
import { Link, matchPath, useLocation } from "react-router-dom";

import logo from "../../assets/Logo/Logo-Full-Light.png";
import { NavbarLinks } from "../../data/navbar-links";
import { apiConnector } from "../../services/apiconnector";
import { categories } from "../../services/apis";
import { ACCOUNT_TYPE } from "../../utils/constants";
import ProfileDropdown from "../core/Auth/ProfileDropDown";

function Navbar() {
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const { totalItems } = useSelector((state) => state.cart);
  const location = useLocation();

  const [subLinks, setSubLinks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [menu, setmenu] = useState(true);

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const res = await apiConnector("GET", categories.CATEGORIES_API);
        // console.log("response:", res)
        setSubLinks(res.data.data);
      } catch (error) {
        console.log("Could not fetch Categories.", error);
      }
      setLoading(false);
    })();
  }, []);

  // console.log("sub links", subLinks)

  const matchRoute = (route) => {
    return matchPath({ path: route }, location.pathname);
  };

  return (
    <div
      className={`flex h-14 items-center justify-center border-b-[1px] border-b-richblack-700 ${
        location.pathname !== "/" ? "bg-richblack-800" : "bg-richblack-900 "
      } transition-all duration-200 z-50`}
    >
      <div className="flex w-11/12 max-w-maxContent items-center justify-between">
        {/* Logo */}
        <Link to="/">
          <img src={logo} alt="Logo" width={160} height={32} loading="lazy" />
        </Link>
        {/* Navigation links */}
        <nav className="md:block md:static sm:absolute">
          <div
            className={`md:static sm:absolute sm:w-[94vw] md:w-full sm:h-[450px] md:h-full sm:-ml-[1vw] md:ml-0 sm:top-10 md:mt-0 ${
              menu ? "sm:ml-[96vw] md:ml-0" : "sm:-ml-[1vw] md:ml-0"
            }  sm:bg-richblack-100 md:bg-transparent sm:bg-opacity-20 sm:backdrop-blur-lg sm:flex sm:items-center sm:justify-center sm:z-10 transition-all ease-in duration-100 sm:rounded-lg`}
          >
            <ul className="flex sm:flex-col md:flex-row gap-x-6 sm:items-center sm:justify-center text-richblack-25 sm:leading-[60px] sm:text-xl md:text-[16px] md:font-normal ">
              {NavbarLinks.map((link, index) => (
                <li key={index}>
                  {link.title === "Catalog" ? (
                    <>
                      <div
                        className={`group relative flex cursor-pointer items-center gap-1 tracking-wide ${
                          matchRoute("/catalog/:catalogName")
                          ? "sm:text-richblack-25 md:text-yellow-25"
                          : "sm:text-yellow-25 md:text-richblack-25"
                        }`}
                      >
                        <p className="">{link.title}</p>
                        <AiFillDownCircle/>
                        <div className="invisible absolute left-[50%] top-[50%] z-[1000] flex w-[250px] translate-x-[-50%] translate-y-[3em] flex-col rounded-lg bg-richblack-5 p-4 text-richblack-900 opacity-0 transition-all duration-150 group-hover:visible group-hover:translate-y-[1.65em] group-hover:opacity-100 lg:w-[300px]  ">
                          <div className="absolute left-[50%] top-0 -z-10 h-6 w-6 translate-x-[80%] translate-y-[-40%] rotate-45 select-none rounded bg-richblack-5"></div>
                          {loading ? (
                            <p className="text-center">Loading...</p>
                          ) : subLinks.length ? (
                            <>
                              {subLinks?.map((subLink, index) => (
                                <Link
                                  to={`/catalog/${subLink.name
                                    .split(" ")
                                    .join("-")
                                    .toLowerCase()}`}
                                  className="rounded-lg bg-transparent pl-4 hover:bg-richblack-25"
                                  key={index}
                                  onClick={() => setmenu(true)}
                                >
                                  <p>{subLink.name}</p>
                                </Link>
                              ))}
                            </>
                          ) : (
                            <p className="text-center">No Courses Found</p>
                          )}
                        </div>
                      </div>
                    </>
                  ) : (
                    <Link to={link?.path} onClick={() => setmenu(true)}>
                      <p
                        className={`tracking-wide ${
                          matchRoute(link?.path)
                            ? "sm:text-richblack-25 md:text-yellow-25"
                            : "sm:text-yellow-25 md:text-richblack-25"
                        } `}
                      >
                        {link.title}
                      </p>
                    </Link>
                  )}
                </li>
              ))}
              <div className="md:hidden flex flex-col items-center gap-5 py-5">
                {/* Login / Signup */}
                {token === null && (
                  <Link to="/login">
                    <button
                      onClick={() => setmenu(true)}
                      className="flex items-center justify-center h-[50px] w-[80vw] rounded-full border border-richblack-700 bg-richblack-800 sm:text-yellow-25 md:text-richblack-25"
                    >
                      Log in
                    </button>
                  </Link>
                )}
                {token === null && (
                  <Link to="/signup">
                    <button
                      onClick={() => setmenu(true)}
                      className="flex items-center justify-center h-[50px] w-[80vw] rounded-full border border-richblack-700 bg-richblack-800 sm:text-yellow-25 md:text-richblack-25"
                    >
                      Sign up
                    </button>
                  </Link>
                )}
                {token !== null && <ProfileDropdown />}
              </div>
            </ul>
          </div>
        </nav>
        {menu ? (
          <button onClick={() => setmenu(false)} className="mr-4 md:hidden">
            <BiMenuAltRight fontSize={30} color="white" />
          </button>
        ) : (
          <button onClick={() => setmenu(true)} className="mr-4 md:hidden">
            <RxCross2 fontSize={30} color="white" />
          </button>
        )}
        <div className="hidden items-center gap-x-4 md:flex">
          {/* Login / Signup / Dashboard */}
          {user && user?.accountType !== ACCOUNT_TYPE.INSTRUCTOR && (
            <Link to="/dashboard/cart" className="relative">
              <AiOutlineShoppingCart className="text-2xl text-richblack-100" />
              {totalItems > 0 && (
                <span className="absolute -bottom-2 -right-2 grid h-5 w-5 place-items-center overflow-hidden rounded-full bg-richblack-600 text-center text-xs font-bold text-yellow-100">
                  {totalItems}
                </span>
              )}
            </Link>
          )}
          {token === null && (
            <Link to="/login">
              <button className="rounded-[8px] border border-richblack-600 bg-richblack-800 px-[12px] py-[8px] text-richblack-100">
                Log in
              </button>
            </Link>
          )}
          {token === null && (
            <Link to="/signup">
              <button className="rounded-[8px] border border-richblack-600 bg-richblack-800 px-[12px] py-[8px] text-richblack-100">
                Sign up
              </button>
            </Link>
          )}
          {token !== null && <ProfileDropdown />}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
