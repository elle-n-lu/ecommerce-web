import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface product {
  id: number;
  title: string;
  price: number;
  url: string;
};

export type cartItem = {
  cart: product;
  amount?: number;
};
export interface CartState {
  cart: cartItem[];
  totalCost: number
}

const initialState: CartState = {
  cart: [],
  totalCost: 0
};

export const counteSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addCart: (state, action: PayloadAction<cartItem>) => {
      state.cart = [...state.cart, {'cart': action.payload.cart,'amount':1}];
      state.totalCost = state.totalCost+ action.payload.cart.price
    },
    removeCart: (state, action: PayloadAction<product>) => {
      // state.cart = state.cart.filter((s) => action.payload.id !== s.id);
      console.log('trytoremove')
    },
    // getCart:(state)=>{
    //     state.cart = [...state.cart]
    // }
  },
});

export const { addCart, removeCart } = counteSlice.actions;

export default counteSlice.reducer;
