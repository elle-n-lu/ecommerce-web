import { Form, Formik } from "formik";
import React from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import InputField from "../components/InputField";
import MainPage from "../components/mainPage";
import {
  useAddOrderMutation,
  useGetOneGuestQuery
} from "../features/products/productSlice";
import { RootState } from "../store/store";

interface shippingProps {}

const Shipping: React.FC<shippingProps> = ({}) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const cart = useSelector((state: RootState) => state.carter.cart);
  const totalAmount = useSelector(
    (state: RootState) => state.carter.totalAmount
  );
  const totalCost = useSelector((state: RootState) => state.carter.totalCost);
  const [addorder] = useAddOrderMutation();
  const { data: guest, isLoading } = useGetOneGuestQuery(id as string);

  if (!guest || isLoading) {
    return <div>isLoading..</div>;
  }
  const body = (
    <div className=" container items-center justify-center mx-auto w-full md:w-1/2">
      <Formik
        initialValues={{
          streetAddress: "",
          city: "",
          state: "",
          postCode: "",
        }}
        onSubmit={async (values) => {
          const res = await addorder({
            account: guest,
            cart,
            totalAmount,
            totalCost,
            shippingAddress: {
              city: values.city,
              postCode: values.postCode,
              state: values.state,
              streetAddress: values.streetAddress,
            },
          });

          if ("data" in res) {
            navigate(`/payment/${id}/${res.data._id}`);
          }

        }}
      >
        {() => (
          <Form>
            <InputField label="street Address" name="streetAddress" />
            <div className="flex">
              <div className="pr-2">
                <InputField label="city" name="city" />
              </div>
              <div className="pr-2">
                <InputField label="state" name="state" />
              </div>
              <div>
                <InputField label="post Code" name="postCode" />
              </div>
            </div>

            <div className=" float-right">
              <button
                className="bg-blue-500 hover:bg-blue-700 px-6 py-2 m-4 rounded-lg text-white "
                type="submit"
              >
                Continue
              </button>

              <Link
                to={".."}
                onClick={(e) => {
                  e.preventDefault();
                  navigate(-1);
                }}
              >
                <button className="px-4 py-2 m-t rounded-lg  text-blue-700 hover:text-black">
                  Back
                </button>
              </Link>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
  return (
    <div>
      <MainPage body={body} />

    </div>
  );
};

export default Shipping;
