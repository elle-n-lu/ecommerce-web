import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ImageList from "../components/ImageList";
import Navbar from "../components/Navbar";
import NavbarComp from "../components/NavbarComp";
import Sidebar from "../components/Sidebar";
import { increment,incrementChange } from "../features/counter/countSlice";
import { RootState } from "../store/store";

interface mainProps {}

const Main: React.FC<mainProps> = ({}) => {
  const count = useSelector((state: RootState)=> state.counter.value)
  const [valu, setValu] = useState(1)
  const dispatch = useDispatch()

  return (
    <div>
      <NavbarComp />
      <div className=" container flex mx-auto mt-8 ">
        <div className=" basis-1/4"><Sidebar /></div>
        <div className=" basis-3/4"><ImageList /></div>
      </div>
     <div>
      <input value={valu} onChange={(e)=>setValu(Number(e.target.value))} />
      <button onClick={()=>dispatch(incrementChange(valu))}>increment</button>{count}
     </div>
    </div>
  );
};

export default Main;
 