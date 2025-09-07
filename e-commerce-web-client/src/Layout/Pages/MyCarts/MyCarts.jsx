import "./MyCarts.css";
import { useContext, useEffect, useState } from "react";
import useAxiosSecure from "../../../Hooks/axiosSecure";
import { AuthContext } from "../../../Context/AuthContext";

const MyCarts = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    if (!user) return;

    const fetchCart = async () => {
      try {
        const res = await axiosSecure.get(`/cart-items/${user.email}`);
        setCart(res.data);
      } catch (err) {
        console.error("Failed to fetch cart items:", err);
      }
    };

    fetchCart();
  }, [axiosSecure, user]);

  const removeFromCart = (index) => {
    const newCart = [...cart];
    newCart.splice(index, 1);
    setCart(newCart);
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
                    className="remove-btn"
                    onClick={() => removeFromCart(index)}
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