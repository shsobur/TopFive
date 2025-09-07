import "./Banner.css";
const Banner = () => {
  return (
    <>
      <section className="hero">
      <div className="hero-content">
        <div className="text-content">
          <h1>Summer Collection 2023</h1>
          <h2>Up to 50% Off on Selected Items</h2>
          <p>Discover the latest trends in fashion and get ready for summer with our exclusive collection. Limited time offer!</p>
          <div className="cta-buttons">
            <button className="btn-primary">Shop Now</button>
            <button className="btn-secondary">Learn More</button>
          </div>
          <div className="features">
            <div className="feature">
              <i className="fas fa-truck"></i>
              <span>Free Shipping</span>
            </div>
            <div className="feature">
              <i className="fas fa-undo"></i>
              <span>30-Day Returns</span>
            </div>
            <div className="feature">
              <i className="fas fa-shield-alt"></i>
              <span>Secure Payment</span>
            </div>
          </div>
        </div>
        <div className="image-content">
          <img 
            src="https://images.unsplash.com/photo-1523381210434-271e8be1f52b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" 
            alt="Summer Collection 2023" 
            className="hero-image"
          />
          <div className="badge">
            <span>Sale</span>
          </div>
        </div>
      </div>
    </section>
    </>
  );
};

export default Banner;
