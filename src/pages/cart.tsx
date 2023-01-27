import { Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { BiArrowBack } from "react-icons/bi";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { CartList } from "../components/cartList";
import InputField from "../components/InputField";
import MainPage from "../components/mainPage";
import { Account, useAdminloginMutation } from "../features/products/productSlice";
import { RootState } from "../store/store";
import { meque } from "../utils/mequery";
import { toErrorMap } from "../utils/toErrorMap";
import { errors } from "./signIn";

interface CartProps {}

const Cart: React.FC<CartProps> = ({}) => {
  const [name, setName] = useState<Account>({ name: "", email: "" });

  useEffect(() => {
    meque(setName);
  }, []);

  const cart = useSelector((state: RootState) => state.carter.cart);
  const totalCost = useSelector((state: RootState) => state.carter.totalCost);
  const totalProduct = useSelector(
    (state: RootState) => state.carter.totalAmount
  );
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const [login] = useAdminloginMutation();

  const modal = (
    <>
      <div className="justify-center  items-center flex flex-col overflow-x-hidden  fixed inset-0 z-50  outline-none focus:outline-none">
        <div className=" grid md:grid-cols-2  max-w-5xl grid-cols-1">
          <div className="border-0 flex flex-col  bg-white p-4 rounded-l-lg ">
            <div className="mb-4">
              <button
                className="flex items-center hover:text-blue-600"
                onClick={() => navigate(0)}
              >
                <BiArrowBack />
                continue shopping
              </button>
            </div>
            <Formik
              initialValues={{ email: "", password: "" }}
              onSubmit={async (values, { setErrors }) => {
                const res = await login({
                  email: values.email,
                  password: values.password,
                });
    
                if ("error" in res && "data" in res.error) {
                  const errors: errors = res.error.data as errors;
                  setErrors(toErrorMap(errors));
                }
    
                if ("data" in res) {
                  navigate("/");
                  navigate(0);
                }
              }}            >
              {() => (
                <Form>
                  <InputField label="email" name="email" />
                  <InputField label="password" name="password" />
                  <div className=" float-right">
                    <button
                      className="bg-blue-500 hover:bg-blue-700 px-4 py-2 m-4 rounded-lg text-white "
                      type="submit"
                    >
                      Sign In
                    </button>
                    <Link to="/signUp">
                      <button
                        className="px-4 py-2 m-t rounded-lg  text-blue-700 hover:text-black"
                        onClick={() => setOpen(false)}
                      >
                        Sign Up
                      </button>
                    </Link>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
          <div className=" flex text-xl font-bold p-4 items-center justify-center bg-blue-400 rounded-r-lg">
            <Link to="/createAcc">
              <button className="hover:border-white p-4 hover:text-white rounded-lg border-black border">
                Continue as guest{" "}
              </button>
            </Link>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );

  const body = (
    <div className="container flex  mx-auto mt-8 items-center ">
      {cart.length > 0 ? (
        <div className="flex flex-col w-full">
          <label className=" p-4">Cart: {totalProduct} Products</label>
          <div className="flex">
            <table className=" " style={{ width: "100vw" }}>
              <thead className=" bg-blue-400">
                <tr>
                  <th className="py-8">Product</th>
                  <th className="py-8" style={{ width: "50%" }}>
                    type
                  </th>
                  <th className="py-8">price</th>
                  <th className="py-8">amount</th>
                  <th></th>
                </tr>
              </thead>

              <tbody>
                {cart.map((s, index) => (
                  <CartList
                    index={index}
                    s={s}
                    key={index}
                    checkorder={false}
                  />
                ))}
              </tbody>
            </table>
          </div>
          <div
            className=" flex flex-col w-1/2 border-gray-200 border-t-2 pt-4 mt-4 "
            style={{ marginLeft: "50%" }}
          >
            <label className=" w-1/2 text-center" style={{ marginLeft: "50%" }}>
              Total : {totalCost}
            </label>
            <button
              className="w-1/2 text-white bg-blue-500 hover:bg-blue-800 p-2 mt-4  text-center rounded-lg "
              style={{ marginLeft: "50%" }}
              onClick={() => {
                if(name.name === ""){

                  setOpen(true);
                }else{
                  navigate(`/shipping/${name._id}`)
                }
              }}
            >
              Submit
            </button>
          </div>
        </div>
      ) : (
        <div className="flex mx-auto items-center">
          <Link to="/" className="flex items-center">
            <button className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-2 py-2 text-center">
              continue shopping
            </button>
          </Link>
          <Link to="/checkOrder">
            <button className="hover:border-green-600  hover:text-white text-sm text-center hover:bg-green-600 ml-4 px-2 py-2 rounded-lg border-black border">
              Check Your Order{" "}
            </button>
          </Link>
        </div>
      )}
    </div>
  );
  return (
    <div>
      <MainPage body={body} />

      {open && modal}
    </div>
  );
};

export default Cart;
