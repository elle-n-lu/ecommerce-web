import { configureStore } from '@reduxjs/toolkit'
import counteReducer from '../features/counter/countSlice'
import loginReducer from '../features/account/loginSlice'
import cartReducer from '../features/cart/cartSlice'

export const store = configureStore({
  reducer: {
    counter: counteReducer,
    loginer: loginReducer,
    carter: cartReducer
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch