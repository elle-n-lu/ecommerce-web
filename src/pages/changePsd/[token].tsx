import React, { useState } from "react";
import { useParams } from "react-router-dom";
import MainPage from "../../components/mainPage";
import * as Yup from "yup";
import { Formik, Form } from "formik";
import InputField from "../../components/InputField";
import { useChangePsdMutation } from "../../features/products/productSlice";
import { errors } from "../signIn";
import { toErrorMap } from "../../utils/toErrorMap";
interface ForgotPsdProps {}

const ForgotPsd: React.FC<ForgotPsdProps> = ({}) => {
  //get token from URL
  //formik input oldPsd && new Psd
  //submit form to server to update password

  const [tokenError, setTokenError] = useState("");
  const { id } = useParams();
  const [changePsd] = useChangePsdMutation();
  const body = (
    <div className=" container items-center justify-center mx-auto w-full md:w-1/2 ">
      <Formik
        initialValues={{
          oldpassword: "",
          newpassword: "",
        }}
        onSubmit={async (values, { setErrors }) => {
          const res = await changePsd({
            id: id as string,
            oldPassword: values.oldpassword,
            newPassword: values.newpassword,
          });
          if ("error" in res && "data" in res.error) {
            const errors: errors = res.error.data as errors;
            const resErrors = toErrorMap(errors);
            if ("oldpassword" in resErrors) {
              setErrors(resErrors);
            }
            if ("token" in resErrors) {
              setTokenError(resErrors.token);
            }
          }

          if ("data" in res) {
            const success_url = process.env.URL as string;
            window.location.href = success_url;
          }
        }}
      >
        {({ errors }) => (
          <Form>
            <InputField label="old Password" name="oldpassword" />

            <InputField label="new Password" name="newpassword" />
            {tokenError ? <p className=" text-red-600">{tokenError}</p> : null}
            <button className="bg-blue-300 px-4 py-2" type="submit">
              Next
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
  return (
    <>
      <MainPage body={body} />
    </>
  );
};

export default ForgotPsd;
