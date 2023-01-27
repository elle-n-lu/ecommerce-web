import { configureStore } from "@reduxjs/toolkit";

import cartReducer from "../features/cart/cartSlice";

import { addProductApi } from "../features/products/productSlice";

export const store = configureStore({
  reducer: {
    carter: cartReducer,

    [addProductApi.reducerPath]: addProductApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(addProductApi.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
