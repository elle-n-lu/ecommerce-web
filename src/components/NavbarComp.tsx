import React from "react";
import Navbar from "./Navbar";


import { Account } from "../features/products/productSlice";
interface NavbarCompProps {
  name: Account
  login: boolean
}

const NavbarComp: React.FC<NavbarCompProps> = ({name,login}) => {

  return (
    <div className="border-b-2">
      <Navbar login={login} name={name} />
    </div>
  );
};

export default NavbarComp;
