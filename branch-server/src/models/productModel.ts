import { Schema, model } from "mongoose";


interface Product {
  
    title: string;
    price: number;
    url: string;
  }

const productSchema = new Schema<Product>(
  {
   title: { type: String, required: true},
    price: { type: Number, required: true, default:0 },
    url:{type: String, required: true},
    
  },
  { timestamps: true }
);

const Product = model<Product>("Product", productSchema);

export default Product;
