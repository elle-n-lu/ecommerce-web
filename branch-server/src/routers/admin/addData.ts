import express from "express";
import bodyParser from "body-parser";
import asyncHandler from "express-async-handler";
import Product from "../../models/productModel";
import { adminAuth } from "../../Utils/adminAuth";

const bodyParse = bodyParser.json();
const AddData = express.Router();

AddData.post(
  "/newproduct",
  bodyParse,
  adminAuth,
  asyncHandler(async (req, res) => {
    const addProduct = await Product.insertMany(req.body);
    res.send(addProduct);
  })
);

AddData.get(
  "/newproduct/:id",
  asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
      res.json(product);
    } else {
      res.status(404);
      throw new Error("order not exist");
    }
  })
);
AddData.post(
  "/delete/:id",
  asyncHandler(async (req, res) => {
    const product = await Product.deleteOne({ _id: req.params.id });
    if (product) {
      res.send("deleted");
    } else {
      res.status(404);
      throw new Error("product not exist");
    }
  })
);

AddData.put(
  "/update/:id",
  bodyParse,
  asyncHandler(async (req, res) => {
    const product = await Product.findById({_id: req.body.id});
    const { title, price, url } = req.body;
    if (product) {
      product.title = title;
      product.url = url;
      product.price = price;
      const produ = await product.save();

      res.status(201).json(produ);
    } else {
      const addProduct = await Product.insertMany(req.body);
      res.send(addProduct);
    }
  })
);
AddData.get(
  "/allproducts",
  asyncHandler(async (_, res) => {
    const addProduct = await Product.find();
    res.send(addProduct);
  })
);

AddData.get(
  "/removeAll",

  asyncHandler(async (_, res) => {
    await Product.remove();
    res.send("removed");
  })
);

export default AddData;
