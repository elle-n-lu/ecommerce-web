import React, { useEffect, useState } from "react";
import { MdDashboardCustomize } from "react-icons/md";
import { Link } from "react-router-dom";
import { Account } from "../features/products/productSlice";
import { meque } from "../utils/mequery";
interface SidebarProps {}

const Sidebar: React.FC<SidebarProps> = ({}) => {
  const liClas = "flex items-center p-2 text-base font-normal text-gray-900 ";
  const svgClas = "w-6 h-6 text-gray-500 ";

  const [name, setName] = useState<Account>({ name: "", email: "" });
  useEffect(() => {
    meque(setName);
  }, []);

  return (
    <aside className="w-64" aria-label="Sidebar">
      {name.isAdmin === true ? (
        <div className="px-3 py-4 overflow-y-auto rounded bg-gray-50 ">
          <Link to="/addProduct ">
            <button className={liClas}>
              <MdDashboardCustomize className={svgClas} />
              <span className="ml-3">Add Products</span>
            </button>
          </Link>
        </div>
      ) : null}
    </aside>
  );
};

export default Sidebar;
