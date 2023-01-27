import moment from "moment";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import MainPage from "../../components/mainPage";
import {
  shipInfo,
  useDeleteManyMutation,
  useDeleteOrderMutation,
  useShowOrdersQuery
} from "../../features/products/productSlice";

interface orderProps {}

const Order: React.FC<orderProps> = ({}) => {
  //gain account id
  //find all orders where account id == id
  //list orders

  const navigate = useNavigate();
  const { data, isLoading } = useShowOrdersQuery();
  const [deleteOrder] = useDeleteOrderMutation();
  const [deleteMany] = useDeleteManyMutation();
  const [box, setBox] = useState(false);
  const [orderList, setOrderList] = useState<any[]>([]);
  const [clicked, setClicked] = useState(false);


  let body;
  if (!data || isLoading) {
    body = <div>isLoading...</div>;
  } else {
    body = (
      <div className="w-3/4 mx-auto mt-5">
        <div className=" flex">
          <button
            className=" border border-blue-600 rounded-lg p-2 hover:bg-blue-600 hover:text-white"
            onClick={() => setBox(true)}
          >
            Manage
          </button>
          {box ? (
            <div className=" w-full self-end">
              <div className="float-right">
                <button
                  className=" border-red-500 border hover:text-white hover:bg-red-500 p-2 mr-4 rounded-lg"
                  onClick={async () => {
                    const res = await deleteMany(orderList);
                    if (res) {
                      navigate(0);
                    }
                  }}
                >
                  Delete
                </button>
                <button
                  className=" hover:text-red-500"
                  onClick={() => {
                    setBox(false);
                    setOrderList([]);
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : null}
        </div>
        <table className="mt-10 w-full">
          <thead
            className=" bg-blue-500 text-white text-xl"
            style={{ height: "55px" }}
          >
            <tr>
              <th>order No. </th>
              <th>order time</th>
              <th>totoal amount</th>
              <th>total cost</th>
              <th className=" px-12">shipping address</th>
              <th>payment status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {data.map((s: shipInfo, index: number) => (
              <tr key={index} className="mt-2 border-b border-gray-400">
                <th className=" py-4 px-4">{s._id}</th>
                <th className=" py-4 px-4">{moment(s.createdAt).calendar()}</th>
                <th>{s.totalAmount}</th>
                <th>{s.totalCost}</th>

                <th>
                  {" "}
                  {s.shippingAddress.streetAddress +
                    " " +
                    s.shippingAddress.city +
                    " " +
                    s.shippingAddress.state +
                    "," +
                    s.shippingAddress.postCode}
                </th>
                <th>
                  <button
                    className={`${
                      s.isPaid ? "bg-green-400" : "bg-red-400"
                    } p-2 text-sm rounded-md hover:shadow-lg hover:${
                      s.isPaid ? "bg-green-700" : "bg-red-700"
                    }"`}
                  >
                    {s.isPaid ? "paid" : "Not paid"}
                  </button>
                </th>
                <th>
                  <button
                    className=" ml-4 text-white px-2 bg-red-500 hover:shadow-md hover:bg-red-700"
                    onClick={async () => {
                      const res = await deleteOrder(s._id as string);
                      if (res) {
                        navigate(0);
                        alert("deleted");
                      }
                    }}
                  >
                    x
                  </button>
                </th>

                {box ? (
                  <th>
                    <input
                      type="checkbox"
                      onClick={() => {
                        setClicked(!clicked);
                        if (orderList.includes(s._id)) {
                          const m = orderList.filter((m, index) => m !== s._id);
                          setOrderList(m);
                        } else {
                          setOrderList([...orderList, s._id]);
                        }
                      }}
                    />
                  </th>
                ) : null}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
  return <MainPage body={body} />;
};

export default Order;
