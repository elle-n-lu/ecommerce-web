import { Form, Formik } from "formik";
import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Avatar from "../../components/avatar";
import InputField from "../../components/InputField";
import MainPage from "../../components/mainPage";
import {
  useEditUserMutation,
  useGetOneGuestQuery, useSendEmailMutation
} from "../../features/products/productSlice";
interface ProfileProps {}

const Profile: React.FC<ProfileProps> = ({}) => {
  const { id } = useParams();
  const { data, isLoading } = useGetOneGuestQuery(id as string);
  const navigate = useNavigate();
  const [editUser] = useEditUserMutation();
  const [sendEmail] = useSendEmailMutation();
  let body;
  if (!id || !data || isLoading) {
    body = <div>isLoading...</div>;
  } else {
    body = (
      <div className="flex items-center justify-center mt-10 mx-auto px-20">
        <Avatar data={data} />
        <div className=" flex flex-col w-1/2">
          <button
            //get user id,
            // set id in URL params
            //get user email
            //click to send email in server
            // alert to ask user check email
            onClick={async () => {
              const res = await sendEmail({ id, email: data.email });
              if (res) {
                alert("email sent, pls check email");
              }
            }}
            className="bg-blue-500 hover:bg-blue-700 px-6 py-2 rounded-lg text-white font-bold w-1/4"
          >
            Change Password
          </button>
          <Formik
            initialValues={{
              name: data.name,
              email: data.email,
              contact: data.contact,
            }}
            onSubmit={async (values) => {
              const res = await editUser({
                _id: id,
                name: values.name,
                email: values.email,
                contact: values.contact,
              });
              if (res) {
                navigate(0);
           
              }
            }}
          >
            {() => (
              <Form className=" mt-8">
                <div className="flex">
                  <button
                    className="bg-blue-500 hover:bg-blue-700 px-6 py-2 rounded-lg text-white "
                    type="submit"
                  >
                    Edit
                  </button>

                  <Link
                    to={".."}
                    onClick={(e) => {
                      e.preventDefault();
                      navigate(-1);
                    }}
                  >
                    <button className="px-4 py-2 m-t rounded-lg   hover:text-blue-500">
                      Back
                    </button>
                  </Link>
                </div>
                <InputField label="name" name="name" />
                <InputField label="email" name="email" />
                <InputField label="contact" name="contact" />
              </Form>
            )}
          </Formik>
        </div>
      </div>
    );
  }
  return (
    <div>
      <MainPage body={body} />
    </div>
  );
};

export default Profile;
