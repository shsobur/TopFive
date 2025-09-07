import { useState } from "react";
import "./AddProducts.css";

const AddProducts = () => {
  const [formData, setFormData] = useState({
    name: "",
    category: "tshirt",
    price: "",
    description: "",
    image: "",
    stock: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log("Product data:", formData);
    alert("Product added successfully!");
  };

  return (
    <>
      <div className="form-container">
        <div className="form-background">
          <div className="shape shape-1"></div>
          <div className="shape shape-2"></div>
          <div className="shape shape-3"></div>
        </div>

        <div className="form-card">
          <div className="form-header">
            <h2>Add New Product</h2>
            <p>Fill in the details below to add a product to your inventory</p>
          </div>

          <form className="product-form" onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="name">Product Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g., Basic T-Shirt"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="category">Category</label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                >
                  <option value="tshirt">T-Shirt</option>
                  <option value="pants">Pants</option>
                  <option value="shoes">Shoes</option>
                </select>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="price">Price ($)</label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="e.g., 20"
                  min="0"
                  step="0.01"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="stock">Stock Quantity</label>
                <input
                  type="number"
                  id="stock"
                  name="stock"
                  value={formData.stock}
                  onChange={handleChange}
                  placeholder="e.g., 50"
                  min="0"
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="description">Product Description</label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="e.g., Comfortable cotton t-shirt"
                rows="4"
                required
              ></textarea>
            </div>

            <div className="form-group">
              <label htmlFor="image">Image URL</label>
              <input
                type="url"
                id="image"
                name="image"
                value={formData.image}
                onChange={handleChange}
                placeholder="e.g., https://via.placeholder.com/150"
                required
              />
            </div>

            {formData.image && (
              <div className="image-preview">
                <p>Image Preview:</p>
                <img src={formData.image} alt="Preview" />
              </div>
            )}

            <div className="form-actions">
              <button type="submit" className="submit-btn">
                Add Product
              </button>
              <button type="button" className="cancel-btn">
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddProducts;
