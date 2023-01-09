import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Cart from "./pages/cart";
import ErrorPage from "./pages/errorPage";
import Main from "./pages/main";

function App() {
  const router = createBrowserRouter([
    { path: "/", element: <Main />, errorElement: <ErrorPage /> },
    {path:"/cart", element: <Cart />}
  ]);

  return <RouterProvider router={router} />
}

export default App;
