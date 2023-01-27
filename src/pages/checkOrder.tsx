import React, { useState } from "react";
import { Link } from "react-router-dom";
import { CartList } from "../components/cartList";
import MainPage from "../components/mainPage";
import {
  useCheckOrderQuery
} from "../features/products/productSlice";

interface checkOrderProps {}

const CheckOrder: React.FC<checkOrderProps> = ({}) => {
  const [value, setValue] = useState("");
  const { data, isLoading, isError } = useCheckOrderQuery(value);


  let body;
  if (!data || isLoading) {
    body = null;
  } else {
    body = (
      <>
        <table className="mt-10">
          <thead
            className=" bg-blue-500 text-white text-xl"
            style={{ height: "55px" }}
          >
            <th>product</th>
            <th>amount</th>
            <th>price</th>
            <th>title</th>
            <th>action</th>
          </thead>
          <tbody>
            {data.cart.map((item, index) => {
              return <CartList s={item} index={index} checkorder={true} />;
            })}
          </tbody>
        </table>
        <div className=" flex mt-8 ">
          <div className=" my-4 text-base w-1/2">
            ship to:
            <span className="ml-4 text-xl">
              {"    " +
                data.shippingAddress.streetAddress +
                " " +
                data.shippingAddress.city +
                " " +
                data.shippingAddress.state +
                " " +
                data.shippingAddress.postCode}
            </span>
          </div>
          <div className=" flex flex-col text-right w-1/2">
            <label className=" text-base">
              total <span className="mx-2 text-xl">{data.totalAmount}</span>{" "}
              products
            </label>
            <label className=" text-base">
              $ <span className="mx-2 text-xl"> {data.totalCost}</span>
            </label>
            <div className="text-right">
              <button
                className="w-1/3 mr-4 text-center bg-red-300 hover:bg-red-500 hover:text-white px-4 py-2"
              >
                Cancel Order
              </button>
              <Link to={`/payment/${data.account._id}/${value}`}>
                <button className=" w-1/3 text-center bg-blue-300 px-4 py-2">
                  continue payment
                </button>
              </Link>
            </div>
          </div>
        </div>
      </>
    );
  }

  const part=(<><div className="container flex flex-col  mx-auto mt-8 items-center ">
  <div>
    <span className="mr-2">Your Order Number:</span>
    <input
      className="border p-2 rounded-md"
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  </div>

  <button
    className="bg-blue-500 text-white px-4 py-2 mt-4 float-right rounded-lg hover:bg-blue-800"
  >
    Check
  </button>
</div>
<div className="container flex flex-col  mx-auto">
  {body}{" "}
  {value && isError && <div className="text-center mt-8">Not found</div>}
</div></>)
  return (
    <div>
      <MainPage body={part} />
      
    </div>
  );
};

export default CheckOrder;
