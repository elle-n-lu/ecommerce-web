import {
  createApi,
  fetchBaseQuery
} from "@reduxjs/toolkit/query/react"
import { cartItem, product } from "../cart/cartSlice";
import { shippingAddress } from "../shipping/shipSlice";
export interface productAdmin {
  title: string;
  price: number;
  url: string;
}

type login = {
  email: string;
  password: string;
};
type registe = {
  email: string;
  password: string;
  name: string
}
export type Account = {
  _id?: string;
  name: string;
  email: string;
  isAdmin?: boolean;
  password?: string;
  isGuest?: boolean;
  contact?: string;
  avatarUrl?: string
};

export interface shipInfo {
  account: Account;
  shippingAddress: shippingAddress;
  cart: cartItem[];
  totalCost: number;
  totalAmount: number;
  _id?: string
  createdAt?:string
  isPaid?: boolean
}
export interface editParams {
  id:string
  title: string;
  price: number;
  url: string;
}
export interface avatarParams {
  id: string
  avatarUrl: string
}

export interface sendEmailParams {
  id: string
  email: string
}

export interface changePsdParams {
  id: string
  oldPassword:string
  newPassword:string
}

export const addProductApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.URL,
    credentials: "include",
    
  }),
  endpoints: (build) => ({
    logout: build.mutation<boolean, void>({
      query: () => ({ url: `api/user/useLogout`, method: "POST" }),
    
    }),
    me: build.query<Account, void>({
      query: () => ({ url: `api/user/me`, method: "GET" }),
    }),
    adminlogin: build.mutation<Account , login>({
      query: (body) => ({ url: `api/user/useLogin`, method: "POST", body }),
    }),
    addPro: build.mutation<productAdmin, productAdmin>({
      query: (body) => ({ url: `api/import/newproduct`, method: "POST", body }),
    }),
    getOneduct: build.query<product, string>({
      query: (id) => ({ url: `api/import/newproduct/${id}`, method: "GET" }),
    }),
    editOneduct:build.mutation<product,editParams>({
      query:(body)=>({url:`api/import/update/${body.id}`, method:"PUT",body})
    }),
    deleteOneduct:build.mutation<any, string>({
      query: (id) => ({ url: `api/import/delete/${id}`, method: "POST" }),
    }),
    getProducts: build.query<product[], void>({
      query: () => ({ url: `api/import/allproducts`, method: "GET" }),
    }),
    addOrder: build.mutation<any, shipInfo>({
      query: (body) => ({ url: `api/order/newOrder`, method: "POST", body }),
    }),
    checkOrder: build.query<shipInfo, string>({
      query: (id) => ({ url: `api/order/newOrder/${id}`, method: "GET" }),
    }),
    deleteOrder:build.mutation<any, string>({
      query: (id) => ({ url: `api/order/deleteOrder/${id}`, method: "POST" }),
    }),
    deleteMany:build.mutation<any, any[]>({
      query: (body) => ({ url: `api/order/deleteMany`, method: "POST", body }),
    }),
    showOrders: build.query<shipInfo[], void>({
      query:()=>({url:`api/order/orders`, method:'GET'})
    }),
    addGuest: build.mutation<Account, Account>({
      query: (body) => ({ url: `api/guest/guestlogin`, method: "POST", body }),
    }),
    addUser:build.mutation<Account, registe>({
      query:(body)=>({url:`api/user/useRegiste`,method:'POST', body})
    }),
    getOneGuest: build.query<Account, string>({
      query: (id) => ({ url: `api/guest/guestlogin/${id}`, method: "GET" }),
    }),
    editUser:build.mutation<Account,Account>({
      query:(body)=>({url:`api/user/update/${body._id}`, method:"PUT",body})
    }),
    editAvatar:build.mutation<Account,avatarParams>({
      query:(body)=>({url:`api/user/uploadAvatar/${body.id}`, method:"PUT",body})
    }),

    addProductStrip: build.mutation<any, productAdmin>({
      query:(body)=>({url:`api/stripe/products`, method:'POST', body})
    }),
    stripPay:build.mutation<any, any[]>({
      query:(body)=>({url:`api/stripe/create-checkout-session`, method:'POST', body})
    }),
    sendEmail:build.mutation<any, sendEmailParams>({
      query:(body)=>({url:`api/user/forgotpassword/${body.id}`,method:'POST', body})
    }),
    changePsd:build.mutation<Account, changePsdParams>({
      query:(body)=>({url:`api/user/changePsd/${body.id}`, method:'POST', body})
    })
  }),
});

export const {
  useLogoutMutation,
  useMeQuery,
  useAdminloginMutation,
  useAddUserMutation,
  useCheckOrderQuery,
  useDeleteOrderMutation,
  useDeleteManyMutation,
  useShowOrdersQuery,
  useGetProductsQuery,
  useGetOneductQuery,
  useEditOneductMutation,
  useDeleteOneductMutation,
  useAddProMutation,
  useAddOrderMutation,
  useAddGuestMutation,
  useGetOneGuestQuery,
  useEditAvatarMutation,
  useEditUserMutation,
  useAddProductStripMutation,
  useStripPayMutation,
  useSendEmailMutation,
  useChangePsdMutation
} = addProductApi;
