import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import AddProduct from "./pages/addProduct";
import Cart from "./pages/cart";
import ForgotPsd from "./pages/changePsd/[token]";
import CheckOrder from "./pages/checkOrder";
import CreateAcc from "./pages/createAcc";
import Edit from "./pages/edit/[id]";
import ErrorPage from "./pages/errorPage";
import Main from "./pages/main";
import Order from "./pages/order/[id]";
import Payment from "./pages/payment/[id]";
import Profile from "./pages/profile/[id]";
import Shipping from "./pages/shipping";
import SignIn from "./pages/signIn";
import SignUp from "./pages/signUp";

function App() {
  const router = createBrowserRouter([
    { path: "/", element: <Main />, errorElement: <ErrorPage /> },
    {path:"/cart", element: <Cart />},
    {path:"/createAcc", element: <CreateAcc />},
    {path:"/shipping/:id", element: <Shipping />},
    {path:"/payment/:id/:id", element: <Payment />},
    {path:"/signIn", element: < SignIn/>},
    {path:"/signUp", element: <SignUp />},
    {path:"/addProduct", element: <AddProduct />},
    {path:"/checkOrder", element: <CheckOrder />},
{path:"/edit/:id",element:<Edit />},
{path:"/profile/:id", element:<Profile />},
{path:"/order/:id", element:<Order />},
{path:"/changePsd/:id", element:<ForgotPsd />}
  ]);

  return (
    <div>
     
      <RouterProvider router={router} />
        
    </div>
  )
}

export default App;
