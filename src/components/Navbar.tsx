import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  Account,
  useLogoutMutation
} from "../features/products/productSlice";
import { RootState } from "../store/store";

interface NavbarProps {
  login: boolean;
  name: Account;
}

const Navbar: React.FC<NavbarProps> = ({ login, name }) => {
  const dropdownClas =
    "block px-4 py-2 text-xl text-gray-700 hover:bg-gray-100 ";

  const [hidden, setHidden] = useState("hidden");
  const totalProduct = useSelector(
    (state: RootState) => state.carter.totalAmount
  );
  const navigate = useNavigate();
  const [logout] = useLogoutMutation();
  return (
    <nav className="bg-white border-gray-200 px-2 sm:px-4 py-2.5 rounded ">
      <div className=" container flex flex-wrap items-center justify-between mx-auto">
        <Link to="/">
          <div className="flex items-center">
            <img
              src="https://flowbite.com/docs/images/logo.svg"
              className="h-6 mr-3 sm:h-9"
              alt="Flowbite Logo"
            />
            <span className="self-center text-2xl font-semibold whitespace-nowrap">
              E-commerce
            </span>
          </div>{" "}
        </Link>

        <div className=" flex">
          <div className="relative hidden items-center md:flex mr-10">
            <div
              className=" absolute top-1 -right-2 w-6 h-6 bg-red-500 text-white rounded-full text-sm text-center"
              style={{ lineHeight: "24px" }}
            >
              {totalProduct}
            </div>
            <Link to="/cart" className={dropdownClas}>
              <button>Cart</button>
            </Link>
          </div>
          {!login ? (
            <div className="flex items-center ">
              <Link to="/signIn" className={dropdownClas}>
                <button>Sign In</button>
              </Link>{" "}
            </div>
          ) : (
            <div className="flex items-center ">
              <button
                type="button"
                className="flex mr-3 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 "
                onClick={() => setHidden(hidden === "hidden" ? "" : "hidden")}
              >
                <img
                  className="w-8 h-8 rounded-full"
                  src="/magic-ball.png"
                  alt="user"
                />
              </button>
              {/* dropdown part */}

              <div
                className={`absolute ${hidden} -ml-24 mt-72 text-base list-none bg-white divide-y divide-gray-100 rounded shadow`}
              >
                <div className="px-4 py-3">
                  <span className="block text-sm text-gray-900 dark:text-white">
                    {name.name}
                  </span>
                  <span className="block text-sm font-medium text-gray-500 truncate dark:text-gray-400">
                    {name.email}
                  </span>
                </div>
                <ul className="py-1" aria-labelledby="user-menu-button">
                  <li className="relative flex items-center md:order-2 md:hidden">
                    <div
                      className=" absolute top-1 right-1/4 w-6 h-6 bg-red-500 text-white rounded-full text-sm text-center"
                      style={{ lineHeight: "24px" }}
                    >
                      {totalProduct}
                    </div>
                    <Link to="/cart" className={dropdownClas}>
                      <button>Cart</button>
                    </Link>
                  </li>

                  <li>
                    <Link to={`/profile/${name._id}`} className={dropdownClas}>
                      Profile
                    </Link>
                  </li>
                  <li>
                    <Link to={`/order/${name._id}`} className={dropdownClas}>
                      Order
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="#"
                      className={dropdownClas}
                      onClick={async () => {
                        const res = await logout();
                        if (res) {
                          navigate("/signIn");
                        }
                      }}
                    >
                      Sign out
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
