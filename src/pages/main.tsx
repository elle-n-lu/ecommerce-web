import React, { useEffect, useState } from "react";
import ImageList from "../components/ImageList";
import MainPage from "../components/mainPage";
import { Account } from "../features/products/productSlice";
import { meque } from "../utils/mequery";

interface mainProps {}

const Main: React.FC<mainProps> = ({}) => {
  const [name, setName] = useState<Account>({ name: "", email: "" });
 

  useEffect(() => {
    meque(setName);
    
  }, []);

  const body = <ImageList name={name} />;
  return (
    <div>
      <MainPage body={body}/>
    </div>
  );
};

export default Main;
