import React from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { addCart, product } from "../features/cart/cartSlice";
import {
  Account, useAddProductStripMutation,
  useDeleteOneductMutation
} from "../features/products/productSlice";

interface ImageItemProps {
  m: product;
  name: Account;
}

const ImageItem: React.FC<ImageItemProps> = ({ m, name }) => {
  const [deleteDuct] = useDeleteOneductMutation();
  const navigate = useNavigate();
  const starSvg = (
    <svg
      aria-hidden="true"
      className="w-5 h-5 text-yellow-300"
      fill="currentColor"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
     
    >
      <title>First star</title>
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
    </svg>
  );
  const btnClas =
    "text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center";
  // const cart = useSelector((state: RootState) => state.carter.cart);
  const dispatch = useDispatch();
  const [addstripPRice] = useAddProductStripMutation();
  return (
    <div
      className="bg-white rounded-lg shadow-md "
      style={{ maxWidth: "250px", height: "400px" }}
    >
      {name.isAdmin === true ? (
        <div className=" items-center text-center" style={{ height: "28px" }}>
          <Link to={`/edit/${m._id}`}>
            <button className="hover:text-green-600 px-2">edit</button>
          </Link>
          <button
            className="hover:text-red-600 px-2"
            onClick={async () => {
              const res = await deleteDuct(m._id);

              if (res) {
                navigate(0);
              }
            }}
          >
            delete
          </button>
        </div>
      ) : null}
     
        <img
          className="p-4 rounded-t-lg "
          style={{ height: "250px", objectFit: "contain" }}
          src={m.url}
          alt="product"
        />
      
      <div className="px-5 pb-5">
        
          <p className="text-sm font-semibold tracking-tight text-gray-900 ">
            {m.title.length > 20
              ? `${m.title.substring(0, 20)}...`
              : `${m.title}`}
          </p>
        
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
          <span className="text-3xl font-bold text-gray-900 ">{m.price}</span>
          <button
            className={btnClas}
            onClick={async (e) => {
              const res = await addstripPRice({
                title: m.title,
                price: m.price,
                url: m.url,
              });
              if ("data" in res) {
                const pricestrip = res.data.default_price.id;
                dispatch(
                  addCart({
                    _id: m._id,
                    price: m.price,
                    title: m.title,
                    priceStrip: pricestrip,
                    url: m.url,
                  })
                );
              }
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
