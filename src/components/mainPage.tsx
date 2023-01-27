import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Account } from "../features/products/productSlice";
import { meque } from "../utils/mequery";
import NavbarComp from "./NavbarComp";
import Sidebar from "./Sidebar";

interface mainPageProps {
  body: JSX.Element;
}

const MainPage: React.FC<mainPageProps> = ({ body }) => {
  const [name, setName] = useState<Account>({ name: "", email: "" });

  useEffect(() => {
    meque(setName);
  }, []);
  const login = name.name === "" ? false : true;
  const location = useLocation();
  const routeList = ["/"];
  return (
    <div>
      <NavbarComp name={name} login={login} />

      {routeList.includes(location.pathname) ? (
        <div className=" container flex flex-col w-full items-center justify-left mx-auto mt-8 ">
        
            <Sidebar />
        
          <div >{body}</div>
        </div>
      ) : (
        <div >{body}</div>
      )}
    </div>
  );
};

export default MainPage;
