import { useState, useEffect, useContext } from "react";
import "./Products.css";
import useAxiosPublic from "../../../Hooks/axiosPublic";
import { AuthContext } from "../../../Context/AuthContext";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";
import useAxiosSecure from "../../../Hooks/axiosSecure";

const Products = () => {
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cartLoading, setCartLoading] = useState(false);
  const [clickProduct, setClickProduct] = useState(0);

  const [selectedCategory, setSelectedCategory] = useState("all");
  const [priceSort, setPriceSort] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch products whenever filters change__
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await axiosPublic.get("/get-products", {
          params: {
            category: selectedCategory !== "all" ? selectedCategory : undefined,
            search: searchQuery || undefined,
            sort: priceSort || undefined,
          },
        });
        setProducts(response.data);
      } catch {
        // error hear__
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [axiosPublic, selectedCategory, priceSort, searchQuery]);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handlePriceSort = (e) => {
    setPriceSort(e.target.value);
  };

  const handleAddCart = (id, idx) => {
    if (user) {
      setClickProduct(idx);

      const cartData = {
        productId: id,
        email: user.email,
      };

      setCartLoading(true);
      axiosSecure
        .post("/cart-item", cartData)
        .then((res) => {
          if (res.data.insertedId) {
            Swal.fire({
              title: "Product added to cart",
              icon: "success",
              draggable: true,
            });
            setCartLoading(false);
          }
        })
        .catch(() => {
          setCartLoading(false);
          Swal.fire({
            title: "Add product to cart failed",
            text: "There might be some issue. Please try again!",
            icon: "error",
          });
        });
    } else {
      Swal.fire({
        title: "Sorry, you are not alow!",
        text: "If you want to add this product to you cart you have to sign in first. Would you like to sign in now?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, sign in",
        cancelButtonText: "No, later",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/sign-in");
        }
      });
    }
  };

  return (
    <div className="product-page">
      <div className="filters-section">
        <h2>Products</h2>

        <div className="search-container">
          <div className="search-box">
            <i className="fas fa-search"></i>
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={handleSearch}
            />
          </div>

          <button
            className="refresh-btn"
            onClick={() => window.location.reload()}
          >
            <i className="fas fa-sync-alt"></i> Refresh
          </button>
        </div>

        <div className="filters-container">
          {/* Category filter */}
          <div className="filter-group">
            <h3>Category</h3>
            <div className="category-filters">
              {["all", "tshirt", "pants", "shoes"].map((cat) => (
                <button
                  key={cat}
                  className={selectedCategory === cat ? "active" : ""}
                  onClick={() => handleCategoryChange(cat)}
                >
                  {cat === "all"
                    ? "All"
                    : cat.charAt(0).toUpperCase() + cat.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Price filter */}
          <div className="filter-group">
            <h3>Sort by Price</h3>
            <select
              value={priceSort}
              onChange={handlePriceSort}
              className="select select-primary"
            >
              <option value="">Select</option>
              <option value="asc">Low to High</option>
              <option value="desc">High to Low</option>
            </select>
          </div>
        </div>
      </div>

      <div className="products-section">
        {loading ? (
          <p>Loading products...</p>
        ) : products.length > 0 ? (
          <div className="products-grid">
            {products.map((product, index) => (
              <div key={product.id || product._id} className="product-card">
                <div className="product-image">
                  <img src={product.image} alt={product.name} />
                  <span className="product-category">{product.category}</span>
                </div>
                <div className="product-info">
                  <h3>{product.name}</h3>
                  <p className="product-price">${product.price}</p>
                  <button
                    onClick={() => handleAddCart(product._id, index)}
                    className="add-to-cart-btn"
                  >
                    {cartLoading && clickProduct === index
                      ? "Adding...."
                      : "Add to Cart"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>No products found.</p>
        )}
      </div>
    </div>
  );
};

export default Products;