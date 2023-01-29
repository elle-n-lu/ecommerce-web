import { model, Schema } from "mongoose";
import Product from "./productModel";
import Account from "./userModel";

type ShipAddress = {
  streetAddress: string;
  city: string;
  state: string;
  postCode: string;
};
type PaymentResult = {
  id: number;
  status: string;
  update_time: string;
  email: string;
};

interface Order {
  account: Account;

  cart: [
    {
      qty: number;
      singleTotalPrice: number;
      cart: { _id: Product; title: string; price: number; url: string };
    }
  ];
  totalCost: number;
  totalAmount: number;

  shippingAddress: ShipAddress;
  paymentMethod: string;
  paymentResult: PaymentResult;
  isPaid: boolean;
  paidAt: number;
  isDelivered: boolean;
  deliveredAt: number;
}

const orderSchema = new Schema<Order>(
  {
    account: {
      type: Schema.Types.ObjectId,
      ref: "Account",
    },

    cart: [
      {
        qty: { type: Number, required: true },
        singleTotalPrice: { type: Number },
        cart: {
      
            _id: {
              type: Schema.Types.ObjectId,
              required: true,
              ref: "Product",
            },
            title: { type: String, required: true },
            price: { type: Number, required: true },
            url: { type: String, required: true },
     },
     
      },
    ],
    totalCost: { type: Number, required: true, default: 0.0 },
    totalAmount: { type: Number, required: true, default: 0.0 },

    shippingAddress: {
      streetAddress: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      postCode: { type: String, required: true },
    },
    paymentMethod: {
      type: String,
      required: true,
      default: "Paypal",
    },
    paymentResult: {
      id: { type: String },
      status: { type: String },
      update_time: { type: String },
      email: { type: String },
    },
    isPaid: {
      type: Boolean,
      required: true,
      default: false,
    },
    paidAt: {
      type: Number,
    },
    isDelivered: {
      type: Boolean,
      required: true,
      default: false,
    },
    deliveredAt: {
      type: Number,
    },
  },
  { timestamps: true }
);

const Order = model<Order>("Order", orderSchema);

export default Order;
