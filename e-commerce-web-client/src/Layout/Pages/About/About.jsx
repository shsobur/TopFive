import "./About.css";

const About = () => {
  return (
    <>
      <div className="about-container">
        <div className="about-background">
          <div className="floating-shape shape-1"></div>
          <div className="floating-shape shape-2"></div>
          <div className="floating-shape shape-3"></div>
          <div className="floating-shape shape-4"></div>
        </div>

        <div className="about-content">
          <div className="profile-section">
            <div className="profile-image-container">
              <img
                src="https://i.postimg.cc/jSbwtz9X/IMG-20250703-173742.jpg"
                alt="Profile"
                className="profile-image"
              />
              <div className="image-border"></div>
            </div>
            <h1 className="profile-name">Hello Astrape.AI Team</h1>
            <p className="profile-intro">
              Thank you for the opportunity to work on this assignment
            </p>
          </div>

          <div className="message-section">
            <div className="message-card">
              <h2>Project Completion Summary</h2>
              <p>
                It was a valuable experience for me, and I enjoyed the challenge
                of putting the pieces together within the given deadline.
              </p>
            </div>

            <div className="message-card">
              <h3>Completed Requirements</h3>
              <ul>
                <li>
                  Authentication using Firebase for signup/login, secured with
                  JWT verification.
                </li>
                <li>
                  Professional UI/UX design with responsive layout (works well
                  on both desktop and mobile).
                </li>
                <li>
                  Products page with full filtering system: by category, price,
                  and search.
                </li>
                <li>
                  Product management: add new products, view products, and
                  filter them.
                </li>
                <li>
                  Cart functionality: users can add items to cart, remove items
                  from cart, and cart data persists based on user
                  authentication.
                </li>
              </ul>
            </div>

            <div className="message-card">
              <h3>Development Approach</h3>
              <p>
                I focused first on completing all the features you specifically
                asked for, then worked on design and responsiveness to give it a
                clean and professional look.
              </p>
            </div>

            <div className="message-card">
              <h3>Areas for Improvement</h3>
              <p>
                At the same time, I want to be transparent about things I
                couldn't polish fully because of the short deadline:
              </p>
              <ul>
                <li>
                  The homepage is minimal (banner, navbar, footer). With more
                  time, I'd expand it with longer sections.
                </li>
                <li>
                  Loading states are functional but could be made smoother.
                </li>
                <li>
                  Product details page is not included, since it wasn't
                  required, and I prioritized filters + cart first.
                </li>
                <li>
                  Some small UI touches could be refined further, but I made
                  sure the core design is consistent and professional.
                </li>
              </ul>
            </div>

            <div className="message-card">
              <h3>Skills Demonstrated</h3>
              <p>Overall, I believe the project demonstrates my ability to:</p>
              <ul>
                <li>Understand requirements clearly.</li>
                <li>
                  Build a functional and user-friendly system under time
                  constraints.
                </li>
                <li>
                  Balance between backend logic (auth, JWT, API routes) and
                  frontend design (React, Tailwind).
                </li>
              </ul>
            </div>

            <div className="closing-card">
              <p>
                Thank you once again for the opportunity. I look forward to
                hearing your feedback.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
