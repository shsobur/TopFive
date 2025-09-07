import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../MainLayout/MainLayout";
import Banner from "../Layout/Pages/HomePage/Banner/Banner";
import ErrorPage from "../Layout/Components/ErrorPage/ErrorPage";
import SignUp from "../Layout/Pages/SignUp/SignUp";
import SignIn from "../Layout/Pages/SignIn/SignIn";

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