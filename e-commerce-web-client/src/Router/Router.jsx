import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../MainLayout/MainLayout";
import Banner from "../Layout/Pages/HomePage/Banner/Banner";
import ErrorPage from "../Layout/Components/ErrorPage/ErrorPage";
import SignUp from "../Layout/Pages/SignUp/SignUp";
import SignIn from "../Layout/Pages/SignIn/SignIn";
import AddProducts from "../Layout/Pages/AddProducts/AddProducts";
import Products from "../Layout/Pages/Products/Products";
import MyCarts from "../Layout/Pages/MyCarts/MyCarts";
import About from "../Layout/Pages/About/About";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: "/",
        element: <Banner></Banner>,
      },
      {
        path: "/products",
        element: <Products></Products>,
      },
      {
        path: "/my-carts",
        element: <MyCarts></MyCarts>,
      },
      {
        path: "/add-products",
        element: <AddProducts></AddProducts>,
      },
      {
        path: "/about",
        element: <About></About>,
      },
      {
        path: "/sign-in",
        element: <SignIn></SignIn>,
      },
      {
        path: "/sign-up",
        element: <SignUp></SignUp>,
      },
    ],
  },
]);

export default router;
