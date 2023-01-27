import { Form, Formik } from "formik";
import React from "react";
import { useNavigate } from "react-router-dom";

import InputField from "../components/InputField";
import MainPage from "../components/mainPage";
import { useAddGuestMutation } from "../features/products/productSlice";

interface createAccProps {}

const CreateAcc: React.FC<createAccProps> = ({}) => {
  const [addguest] = useAddGuestMutation();

  const navigate = useNavigate();
  const body = (
    <div className=" container items-center justify-center mx-auto w-full md:w-1/2 ">
      <Formik
        initialValues={{
          firstName: "",
          lastName: "",
          email: "",
          contact: "",
        }}
        onSubmit={async (values) => {
          const res = await addguest({
            email: values.email,
            name: values.firstName + values.lastName,
          });

          if ("data" in res) {
            navigate(`/shipping/${res.data._id}`);
          }
        }}
      >
        {() => (
          <Form>
            <div className="flex">
              <div className="pr-2">
                <InputField label="first Name" name="firstName" />
              </div>
              <div className="pr-2">
                {" "}
                <InputField label="last Name" name="lastName" />
              </div>
            </div>
            <div className="flex">
              <div className="pr-2">
                <InputField label="email" name="email" />
              </div>
              <div className="pr-2">
                <InputField label="contact number" name="contact" />
              </div>
            </div>

            <button className="bg-blue-300 px-4 py-2" type="submit">
              Next
            </button>
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

export default CreateAcc;
