import "./MyCarts.css";
import { useContext, useEffect, useState } from "react";
import useAxiosSecure from "../../../Hooks/axiosSecure";
import { AuthContext } from "../../../Context/AuthContext";
import Swal from "sweetalert2";

const MyCarts = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);
  const [cartLoading, setCartLoading] = useState(false);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    if (!user) return;

    const fetchCart = async () => {
      try {
        setCartLoading(true);
        const res = await axiosSecure.get(`/cart-items/${user.email}`);
        setCart(res.data);
        setCartLoading(false);
      } catch {
        setCartLoading(false);
      }
    };

    fetchCart();
  }, [axiosSecure, user]);

  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const deleteRes = await axiosSecure.delete(
            `/delete-product-cart/${id}`
          );

          if (deleteRes.data.deletedCount > 0) {
            const cartRes = await axiosSecure.get(`/cart-items/${user.email}`);
            if (cartRes.data) {
              setCart(cartRes.data);
              Swal.fire({
                title: "Item removed from cart",
                icon: "success",
                draggable: true,
              });
            }
          } else {
            Swal.fire({
              title: "Delete failed",
              text: "There might be some issue. Please try again!",
              icon: "error",
            });
          }
        } catch (error) {
          console.error(error);
          Swal.fire({
            title: "Error",
            text: "Something went wrong while deleting",
            icon: "error",
          });
        }
      }
    });
  };

  return (
    <>
      <div className="cart-container">
        <h1 className="cart-title">Your Cart ({cart.length} items)</h1>

        {cart.length === 0 ? (
          <div className="empty-cart">
            <i className="fas fa-shopping-cart"></i>
            <h2>Your cart is empty</h2>
            <p>Add some products to see them here</p>
          </div>
        ) : cartLoading ? (
          <p className="text-5xl text-center my-20 font-semibold">
            Cart Loading...
          </p>
        ) : (
          <div className="cart-grid">
            {cart.map((item, index) => (
              <div key={index} className="cart-card">
                <div className="cart-card-image">
                  <img src={item.image} alt={item.name} />
                  <span className="category-badge">{item.category}</span>
                </div>

                <div className="cart-card-content">
                  <h3 className="product-name">
                    {item.name.length > 10
                      ? `${item.name.substring(0, 30)} ...`
                      : item.name}
                  </h3>
                  <p className="product-price">৳{item.price}</p>
                  <p className="product-stock">{item.stock} in stock</p>

                  <div className="product-description">
                    {item.description.length > 100
                      ? `${item.description.substring(0, 100)}...`
                      : item.description}
                  </div>

                  <button
                    onClick={() => handleDelete(item._id)}
                    className="remove-btn"
                  >
                    <i className="fas fa-trash"></i> Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default MyCarts;
