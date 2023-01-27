import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface product {
  _id: string;
  title: string;
  price: number;
  url: string;
  priceStrip?: string
}

export type cartItem = {
 cart:product
  qty: number;
  singleTotalPrice?:number
  
};
export interface CartState {
  cart: cartItem[];
  totalCost: number;
  totalAmount: number;
}

const initialState: CartState = {
  cart: [],
  totalCost: 0,
  totalAmount: 0,
};

export const counteSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addCart: (state, action: PayloadAction<product>) => {
      let exist = false;
      const newCart = state.cart.map((s) => {
        if (s.cart._id === action.payload._id) {
          (s.qty as number)++;
          exist = true;
        }
        return s;
      });
      if (exist) {
        state.cart = newCart;
      } else {
      
        state.cart = [...state.cart, {cart:action.payload, qty: 1}];
      }

      state.totalCost = state.totalCost + action.payload.price;
      state.totalAmount++;
    },
  
    removeCart: (state, action: PayloadAction<number>) => {
      if (action.payload === 0) {
        state.totalAmount -= state.cart[0].qty as number;
      } else {
        state.totalAmount -= state.cart[action.payload - 1].qty as number;
      }
      state.cart = state.cart.filter((s,index) => action.payload !== index);
    },
    minusItem: (state, action: PayloadAction<product>) => {
      const newCart = state.cart.map((s) => {
        if (s.cart._id === action.payload._id) {
          (s.qty as number)--;
          state.totalCost -= s.cart.price
          state.totalAmount --
        }
        return s;
      });
      state.cart = newCart.reduce((total:cartItem[], value)=> value.qty === 0? total : [...total,value], [])
      
    },
  },
});

export const { addCart, removeCart,minusItem } = counteSlice.actions;

export default counteSlice.reducer;
