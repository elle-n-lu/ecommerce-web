import React from "react";
import { Account, useGetProductsQuery } from "../features/products/productSlice";
import ImageItem from "./ImageItem";
interface ImageListProps {
  name: Account
}

const ImageList: React.FC<ImageListProps> = ({name}) => {
  const {data,isLoading} = useGetProductsQuery( )

  if(!data || isLoading){
    return (<div>loading</div>)
  }else{

    return (
      <div className="flex flex-wrap">
        {data.map((s, index) => (
          <div className=" m-5" key={index}>
            <ImageItem m={s} name={name} />
          </div>
        ))}
     
      </div>
    );
  }
};

export default ImageList;
