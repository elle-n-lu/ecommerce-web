import { createSlice } from "@reduxjs/toolkit";

interface UserState{
    login: boolean
}

const initialState:UserState = {
    login:false,
  };
  
  export const loginSlice = createSlice({
    name: "login",
    initialState,
    reducers: {
      userLogin: (state) => {
        state.login = true
      },
      userLogout: (state )=>{
        state.login = false
      }
    },
  });
  
  export const {userLogin, userLogout} = loginSlice.actions
  
  export default loginSlice.reducer