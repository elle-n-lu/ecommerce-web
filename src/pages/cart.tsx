import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import NavbarComp from "../components/NavbarComp";
import { RootState } from "../store/store";

interface CartProps {}

const Cart: React.FC<CartProps> = ({}) => {
  const cart = useSelector((state: RootState) => state.carter.cart);
  const totalCost = useSelector((state: RootState) => state.carter.totalCost);
  const [open, setOpen] = useState(false);

  const modal = (
    <>
    <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
      <div className="relative w-auto my-6 mx-auto max-w-3xl">
        <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
          {/*header*/} I always felt like I could do anything. That’s the main
          thing people are controlled by! Thoughts- their perception of
          themselves! They're slowed down by their perception of themselves. If
          you're taught you can’t do anything, you won’t do anything. I was
          taught I could do everything.
          <button
            className="bg-blue-600 p-4 text-white"
            onClick={() => setOpen(false)}
          >
            close
          </button>
        </div>
      </div>
    </div>
    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );

  return (
    <div>
      <NavbarComp />
      <div className="container flex mx-auto mt-8 items-center ">
        {cart.length > 0 ? (
          <div className="flex flex-col">
            <label className=" border-gray-200 border-b-2 p-4">Cart:</label>

            {cart.map((s, index) => (
              <div key={index} className="flex mt-10 ">
                {" "}
                <img
                  className="w-12 h-12 rounded-t-lg"
                  src={s.cart.url}
                  alt="product image"
                />
                <label className=" text-red-600">{s.cart.price}</label>{" "}
                {s.amount}
                <br />
                {s.cart.title}
              </div>
            ))}
            <div
              className=" flex flex-col w-1/2 border-gray-200 border-t-2 pt-4 mt-4 "
              style={{ marginLeft: "50%" }}
            >
              <label
                className=" w-1/2 text-center"
                style={{ marginLeft: "50%" }}
              >
                Total : {totalCost}
              </label>
              <button
                className="w-1/2 text-white bg-blue-500 hover:bg-blue-800 p-2 mt-4  text-center rounded-lg "
                style={{ marginLeft: "50%" }}
                onClick={() => setOpen(true)}
              >
                Submit
              </button>
            </div>
          </div>
        ) : (
          <Link to="/" className="flex items-center">
            <button className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-2 py-2 text-center">
              continue shopping
            </button>
          </Link>
        )}
      </div>
      {open && modal}
    </div>
  );
};

export default Cart;
