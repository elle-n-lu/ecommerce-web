import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addCart, cartItem, product } from "../features/cart/cartSlice";
import { RootState } from "../store/store";

interface ImageItemProps {
  m: cartItem;
}

const ImageItem: React.FC<ImageItemProps> = ({ m }) => {
  const starSvg = (
    <svg
      aria-hidden="true"
      className="w-5 h-5 text-yellow-300"
      fill="currentColor"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
      onClick={() => console.log("click")}
    >
      <title>First star</title>
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
    </svg>
  );
  const btnClas =
    "text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center";
  // const cart = useSelector((state: RootState) => state.carter.cart);
  const dispatch = useDispatch();
  return (
    <div
      className="bg-white rounded-lg shadow-md "
      style={{ maxWidth: "250px" }}
    >
      <a href="#">
        <img className="p-8 rounded-t-lg" src={m.cart.url} alt="product image" />
      </a>
      <div className="px-5 pb-5">
        <a href="#">
          <p className="text-sm font-semibold tracking-tight text-gray-900 ">
            {m.cart.title}
          </p>
        </a>
        <div className="flex items-center mt-2.5 mb-5">
          {starSvg}
          {starSvg}
          {starSvg}
          {starSvg}
          {starSvg}
          <span className="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded ">
            5.0
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-3xl font-bold text-gray-900 ">{m.cart.price}</span>
          <button
            className={btnClas}
            onClick={() => {
              dispatch(addCart(m));
            }}
          >
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageItem;
