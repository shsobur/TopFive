import { Outlet } from "react-router-dom";
import Navbar from "../Layout/Shared/Navbar/Navbar";
import Footer from "../Layout/Shared/Footer/Footer";

const MainLayout = () => {
  return (
    <>
      <Navbar></Navbar>
      <Outlet></Outlet>
      <Footer></Footer>
    </>
  );
};

export default MainLayout;
