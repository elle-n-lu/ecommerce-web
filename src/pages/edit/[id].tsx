import { Form, Formik } from "formik";
import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import InputField from "../../components/InputField";
import MainPage from "../../components/mainPage";
import {
  useEditOneductMutation,
  useGetOneductQuery
} from "../../features/products/productSlice";

interface EditProps {}

const Edit: React.FC<EditProps> = ({}) => {
  const { id } = useParams();

  const { data, isLoading } = useGetOneductQuery(id as string);
  const [editDuct] = useEditOneductMutation();
  const navigate = useNavigate();
  let body;
  if (!id || !data || isLoading) {
    body = <div>isLoading...</div>;
  } else {
    body = (
      <div className="flex items-center justify-center mt-10 mx-auto px-20">
        <div className="px-28" style={{ width: "50%", objectFit: "cover" }}>
          <img
            className="p-8 rounded-t-lg "
            src={data.url}
            alt="product "
          />
        </div>
        <Formik
          initialValues={{
            title: data.title,
            price: data.price,
            url: data.url,
          }}
          onSubmit={async (values) => {
            const res = await editDuct({
              id,
              title: values.title,
              price: values.price,
              url: values.url,
            });
            if(res){
              navigate('/')
              navigate(0)
            }
          }}
        >
          {() => (
            <Form className=" w-1/2">
              <InputField label="title" name="title" />
              <InputField label="price" name="price" />
              <InputField label="url" name="url" />
              <div className=" float-right">
                <button
                  className="bg-blue-500 hover:bg-blue-700 px-6 py-2 m-4 rounded-lg text-white "
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
  }
  return (
    <>
      <MainPage body={body} />
    </>
  );
};

export default Edit;
