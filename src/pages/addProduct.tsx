import React from "react";
import { Add } from "../components/add";
import MainPage from "../components/mainPage";

interface addProductProps {}

const AddProduct: React.FC<addProductProps> = ({}) => {
    const body=<Add />
  return (
    <MainPage body={body} />
          
    
  );
};

export default AddProduct;
