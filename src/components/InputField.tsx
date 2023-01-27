import React, { InputHTMLAttributes } from "react";
import { useField, Field, ErrorMessage } from "formik";

type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  name: string;
};

const InputField: React.FC<InputFieldProps> = ({ label, ...props }) => {
  const [field, { error }] = useField(props);

  const inputClass =
    "shadow appearance-none border rounded w-full py-4 px-10 mb-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline";
  return (
    <>
      <label
        className="block text-gray-700 text-sm font-bold mb-6"
        htmlFor={field.name}
      >
        {label}
      </label>

      <Field
        className={inputClass}
        name={field.name}
        id={field.name}
        type={field.name.includes('password')?'password': field.name}
        placeholder={field.name}
      />

      {error ? (
        <ErrorMessage
          name={field.name}
          render={(error) => <div className=" text-red-700">{error} </div>}
        />
      ) : null}
    </>
  );
};

export default InputField;
