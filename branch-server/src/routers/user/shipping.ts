import express from "express";
import bodyParser from "body-parser";
import asyncHandler from "express-async-handler";
import Order from "../../models/orderModel";
import { isAuth } from "../../Utils/adminAuth";

const bodyParse = bodyParser.json();
const AddOrder = express.Router();
AddOrder.get(
  "/",
  asyncHandler(async (_, res) => {
    const orders = await Order.find();
    res.json(orders);
  })
);
AddOrder.get(
  "/orders",
  isAuth,
  bodyParse,
  asyncHandler(async (req, res) => {
    const orders = await Order.find({ account: req.session.userId });
    if (orders) {
      res.send(orders);
    } else {
      throw new Error("user has no order");
    }
  })
);
AddOrder.post(
  "/newOrder",

  bodyParse,
  asyncHandler(async (req, res) => {
    const { account, cart, totalAmount, totalCost, shippingAddress } = req.body;
    const order = new Order({
      account,
      cart,
      totalAmount,
      totalCost,
      shippingAddress,
    });
    const addOrder = await order.save();
    res.json(addOrder);
  })
);

AddOrder.get(
  "/newOrder/:id",
  asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (order) {
      res.json(order);
    } else {
      res.status(404);
      throw new Error("order not exist");
    }
  })
);

AddOrder.get(
  "/removeAll",
  asyncHandler(async (_, res) => {
    await Order.remove();
    res.send("removed");
  })
);

AddOrder.post(
  "/deleteOrder/:id",
  asyncHandler(async (req, res) => {
    const use = await Order.deleteOne({ _id: req.params.id });
    if (use) {
      res.send("deleted");
    } else {
      throw new Error("error");
    }
  })
);

AddOrder.post("/deleteMany", bodyParse, asyncHandler(async (req, res) => {
  const orders = await Order.deleteMany({_id:req.body})
  if(orders){
    res.send('deleted')
  }else {
    throw new Error("error");
  }
}))

AddOrder.put(
  "/:id/pay",
  isAuth,
  bodyParse,
  asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);

    if (order) {
      order.isPaid = true;
      order.paidAt = Date.now();
      order.paymentResult = {
        id: req.body.id,
        email: req.body.email,
        status: req.body.status,
        update_time: req.body.update_time,
      };
      const updateorder = await order.save();
      res.json(updateorder);
    } else {
      res.status(404);
      throw new Error("Order not found");
    }
  })
);

export default AddOrder;
