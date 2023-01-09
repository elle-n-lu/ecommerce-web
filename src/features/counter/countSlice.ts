import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface CountState {
  value: number;
}

const initialState: CountState = {
  value: 0,
};

export const counteSlice = createSlice({
  name: "count",
  initialState,
  reducers: {
    increment: (state) => {
      state.value++;
    },
    incrementChange: (state, action:PayloadAction<number> )=>{
      state.value  += action.payload
    }
  },
});

export const {increment, incrementChange} = counteSlice.actions

export default counteSlice.reducer
