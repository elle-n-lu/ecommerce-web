import React from "react";
import { cartItem, product } from "../features/cart/cartSlice";
import ImageItem from "./ImageItem";

interface ImageListProps {}

const ImageList: React.FC<ImageListProps> = ({}) => {
  const item: cartItem = {
    cart: {
      id: 1,
      title: "Apple Watch Series 7 GPS, Aluminium Case, Starlight Sport",
      price: 599,
      url: "https://flowbite.com/docs/images/products/apple-watch.png",
    },
  };
  // const item=(<ImageItem />)
  const list = [item, item, item, item, item];
  return (
    <div className="flex flex-wrap">
      {list.map((s, index) => (
        <div className=" m-5" key={index}>
          <ImageItem m={s} />
        </div>
      ))}
    </div>
  );
};

export default ImageList;
