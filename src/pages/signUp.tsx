import { Form, Formik } from "formik";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import InputField from "../components/InputField";
import MainPage from "../components/mainPage";
import { useAddUserMutation } from "../features/products/productSlice";
interface signUpProps {}

const SignUp: React.FC<signUpProps> = ({}) => {
  const [addUser] = useAddUserMutation();
  const navigate = useNavigate();
  const SignupSchema = Yup.object().shape({
  username: Yup.string()
    .min(3, "Too Short!")
    .max(10, "Too Long!")
    .required("Required"),
    email:Yup.string().email().required("Required"),
  password: Yup.string().required("Required"),
});
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
          initialValues={{ username: "", email: "", password: "" }}
          validationSchema={SignupSchema}
          onSubmit={async (values, { setErrors }) => {
            const res = await addUser({
              password: values.password,
              email: values.email,
              name: values.username,
            });

         
            if ("data" in res) {
              navigate("/signIn");
            }
          }}
        >
          {() => (
            <Form>
              <InputField label="username" name="username" />
              <InputField label="email" name="email" />
              <InputField label="password" name="password" />
              <div className=" flex flex-col 2xl:flex-row  items-center justify-center md:float-right">
                <button
                  className="bg-blue-500 h-10 w-24 hover:bg-blue-700 px-4 rounded-lg text-white "
                  type="submit"
                >
                  Sign Up
                </button>

                <div className="text-center mx-2 ">
                  <label className=" text-sm">Already have an account? </label>
                  <Link to="/signIn">
                    <button className="px-4 py-2  text-black   hover:text-blue-700 hover:border-b hover:border-blue-700">
                      Sign In
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

export default SignUp;
