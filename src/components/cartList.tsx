import React from "react";
import { useDispatch } from "react-redux";
import { addCart, cartItem, minusItem, removeCart } from "../features/cart/cartSlice";

interface cartListProps {
  index: number;
  s: cartItem;
  checkorder: boolean
}

export const CartList: React.FC<cartListProps> = ({ index, s ,checkorder}) => {
  const dispatch = useDispatch();
  return (
    <tr key={index} className="mt-2 border-b border-gray-400">
      <th className=" py-4">
        <img
          className="w-12 h-12 rounded-t-lg m-auto"
          src={s.cart.url}
          alt="product "
        />
      </th>
      <th>{s.cart.title}</th>
      <th>
        <label className=" text-red-600">{s.cart.price}</label>
      </th>
      <th style={{ lineHeight: "16px" }}>

       {checkorder? null: <button className="w-4 h-4  rounded-md text-white bg-blue-500 m-2" onClick={()=>dispatch(minusItem(s.cart))}>
          -
        </button>}
        {s.qty}
        {checkorder? null:<button
          className=" w-4 h-4 rounded-md text-white bg-blue-500 m-2"
          onClick={() => {
            dispatch(addCart(s.cart));
            
          }}
        >
          +
        </button>}
      </th>
      <th>
        <button
          className=" w-6 h-6 rounded-full text-white bg-red-500"
          onClick={() => {
            dispatch(removeCart(index));
          }}
        >
          x
        </button>
      </th>
    </tr>
  );
};
