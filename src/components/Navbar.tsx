import React, { useState } from "react";
import { Link } from "react-router-dom";
interface NavbarProps {
  login: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ login }) => {
  const dropdownClas =
    "block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 ";

  const [hidden, setHidden] = useState("hidden");
  const ulClas =
    "flex flex-col p-4 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white ";
  const liClas =
    'block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 "';
  return (
    <nav className="bg-white border-gray-200 px-2 sm:px-4 py-2.5 rounded ">
      <div className=" container flex flex-wrap items-center justify-between mx-auto">
        <Link to="/" className="flex items-center">
          <img
            src="https://flowbite.com/docs/images/logo.svg"
            className="h-6 mr-3 sm:h-9"
            alt="Flowbite Logo"
          />
          <span className="self-center text-xl font-semibold whitespace-nowrap">
            E-commerce
          </span>
        </Link>

        <div
          className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
          id="mobile-menu-2"
        >
          <ul className={ulClas}>
            <li>
              <Link
                to="/"
                className="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 "
                aria-current="page"
              >
                Home
              </Link>
            </li>
            <li>
              <Link to="#" className={liClas}>
                About
              </Link>
            </li>
            <li>
              <Link to="#" className={liClas}>
                Services
              </Link>
            </li>
            <li>
              <Link to="#" className={liClas}>
                Pricing
              </Link>
            </li>
            <li>
              <Link to="#" className={liClas}>
                Contact
              </Link>
            </li>
          </ul>
        </div>
        <div className="flex items-center md:order-2">
          <Link to="/cart" className={dropdownClas}>
            <button>Cart</button>
          </Link>
        </div>
        {!login ? (
          <div className="flex items-center md:order-3">
            <Link to="#" className={dropdownClas}>
              <button>Sign In</button>
            </Link>{" "}
          </div>
        ) : (
          <div className="flex items-center md:order-2">
            <button
              type="button"
              className="flex mr-3 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 "
              onClick={() => setHidden(hidden === "hidden" ? "" : "hidden")}
            >
              <span className="sr-only">Open user menu</span>
              <img
                className="w-8 h-8 rounded-full"
                src="/magic-ball.png"
                alt="user photo"
              />
            </button>
            {/* dropdown part */}

            <div
              className={`absolute ${hidden} -ml-24 mt-72 text-base list-none bg-white divide-y divide-gray-100 rounded shadow`}
            >
              <div className="px-4 py-3">
                <span className="block text-sm text-gray-900 dark:text-white">
                  Bonnie Green
                </span>
                <span className="block text-sm font-medium text-gray-500 truncate dark:text-gray-400">
                  name@flowbite.com
                </span>
              </div>
              <ul className="py-1" aria-labelledby="user-menu-button">
                <li>
                  <Link to="#" className={dropdownClas}>
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link to="#" className={dropdownClas}>
                    Settings
                  </Link>
                </li>
                <li>
                  <Link to="#" className={dropdownClas}>
                    Earnings
                  </Link>
                </li>
                <li>
                  <Link to="#" className={dropdownClas}>
                    Sign out
                  </Link>
                </li>
              </ul>
            </div>

            <button
              data-collapse-toggle="mobile-menu-2"
              type="button"
              className="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 "
            >
              <span className="sr-only">Open main menu</span>
              <img src="/magic-ball.png" className=" h-6 w-6" />
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
