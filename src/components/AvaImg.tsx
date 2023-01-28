import React  from 'react'
import { useMeQuery } from "../features/products/productSlice";

interface AvaImgProps {
  id: string;
}

const AvaImg: React.FC<AvaImgProps> = ({ id }) => {
  const { data, isLoading } = useMeQuery();
  if (!data || isLoading) {
    return null
  } else {
    return (
      <>
        <img
          className="rounded-full"
          style={{ width: "256px", height: "256px" }}
          src={data.avatarUrl}
          alt="product"
        />
      </>
    );
  }
};

export default AvaImg;
