import { Form, Formik } from "formik";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import InputField from "../components/InputField";
import MainPage from "../components/mainPage";
import { useAdminloginMutation } from "../features/products/productSlice";
import { toErrorMap } from "../utils/toErrorMap";

interface signInProps {}
export type errors = { errors: [{ field: string; message: string }] };
const SignIn: React.FC<signInProps> = ({}) => {
  const [login] = useAdminloginMutation();
  const navigate = useNavigate();
  const body = (
    <div
      className=" pt-32"
      style={{
        height: "100vh",
        backgroundImage:
          "url(" +
          "https://blog.prezi.com/wp-content/uploads/2019/03/jason-leung-479251-unsplash.jpg" +
          ")",
        backgroundSize: "cover",
      }}
    >
      <div className="container flex items-center justify-center border sm:w-2/3 md:w-2/6 2xl:w-3/12 p-10 mx-auto bg-white">
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
              // navigate(0);
            }
          }}
        >
          {({ errors }) => (
            <Form>
              <InputField label="email" name="email" />
              <InputField label="password" name="password" />
              <div className=" flex flex-col 2xl:flex-row  items-center justify-center md:float-right">
                <button
                  className="bg-blue-500 h-10 hover:bg-blue-700 px-2 rounded-lg text-white "
                  type="submit"
                >
                  Sign In
                </button>

                <div className="text-center mx-2">
                  <label>Not registed? </label>
                  <Link to="/signUp">
                    <button className="px-4 py-2 text-black   hover:text-blue-700 hover:border-b hover:border-blue-700">
                      Sign Up
                    </button>
                  </Link>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
  return (
    <>
      <MainPage body={body} />
    </>
  );
};

export default SignIn;
