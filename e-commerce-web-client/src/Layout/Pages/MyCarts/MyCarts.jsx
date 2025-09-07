import { useContext, useEffect } from "react";
import "./MyCarts.css";
import useAxiosSecure from "../../../Hooks/axiosSecure";
import { AuthContext } from "../../../Context/AuthContext";

const MyCarts = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (!user) return;

    const fetchCart = async () => {
      try {
        const res = await axiosSecure.get(`/cart-items/${user.email}`);
        console.log(res.data);
      } catch (err) {
        console.error("Failed to fetch cart items:", err);
      }
    };

    fetchCart();
  }, [axiosSecure, user]);

  return (
    <>
      <section>Cart page</section>
    </>
  );
};

export default MyCarts;
