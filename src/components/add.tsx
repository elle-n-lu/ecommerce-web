import { Form, Formik } from "formik";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useAddProMutation } from "../features/products/productSlice";
import InputField from "./InputField";

interface addProps {}

export const Add: React.FC<addProps> = ({}) => {
  const [addProd] = useAddProMutation();
  const navigate = useNavigate()
 
  return (
    <Formik
      initialValues={{ title: "", price: "", url: "" }}
      onSubmit={async (values) => {
       await addProd({
          price: parseInt(values.price),
          title: values.title,
          url: values.url,
        }).catch(err=>alert('need login'))
       
        navigate('/')
        navigate(0)
     
      }}
    >
      {() => (
        <Form className=" w-1/2 mx-auto">
          <InputField label="title" name="title" />
          <InputField label="price" name="price" />

          <InputField label="url" name="url" />
          <button
            className="bg-blue-500 hover:bg-blue-700 px-6 py-2 m-4 rounded-lg text-white "
            type="submit"
          >
            SUBMIT
          </button>
        </Form>
      )}
    </Formik>
  );
};
