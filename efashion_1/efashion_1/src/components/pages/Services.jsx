import React from "react";
import { Link } from "react-router-dom"; // Import Link for navigation

const Services = () => {
  return (
    <>
      {/* Navbar Section */}
      <div className="hero_area">
        <header className="header_section">
          <div className="container-fluid">
            <nav className="navbar navbar-expand-lg custom_nav-container">
              <a className="navbar-brand" href="/">
                <span>E-Fashion</span>
              </a>
              <button
                className="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="s-1"> </span>
                <span className="s-2"> </span>
                <span className="s-3"> </span>
              </button>
              <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <div className="d-flex mx-auto flex-column flex-lg-row align-items-center">
                  <ul className="navbar-nav">
                    <li className="nav-item">
                      <a className="nav-link" href="/">Home</a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" href="/about">About</a>
                    </li>
                    <li className="nav-item active">
                      <a className="nav-link" href="/services">Services</a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" href="/contact">Contact Us</a>
                    </li>
                  </ul>
                </div>
                <div className="quote_btn-container">
                  <div className="btn-box">
                    <Link to="/login" className="btn-1">Login</Link>
                    <Link to="/signup" className="btn-2">Signup</Link>
                  </div>
                </div>
              </div>
            </nav>
          </div>
        </header>
      </div>

      {/* Services Section */}
      <div style={styles.container}>
        <header style={styles.header}>
          <h1 style={styles.title}>
            Our <span style={{ color: "#ffcc00" }}>Services</span>
          </h1>
          <p style={styles.subtitle}>
            Explore the premium services we offer to enhance your shopping experience.
          </p>
        </header>

        <div style={styles.serviceContainer}>
          {/* Fast Delivery */}
          <div style={styles.serviceCard}>
            <img
              src="https://cdn-icons-png.flaticon.com/512/2331/2331970.png"
              alt="Fast Delivery"
              style={styles.icon}
            />
            <h2 style={styles.serviceTitle}>Fast Delivery</h2>
            <p style={styles.serviceText}>
              Get your orders delivered within 2-3 business days with our express shipping.
            </p>
          </div>

          {/* Secure Payments */}
          <div style={styles.serviceCard}>
            <img
              src="https://cdn-icons-png.flaticon.com/512/3064/3064155.png"
              alt="Secure Payments"
              style={styles.icon}
            />
            <h2 style={styles.serviceTitle}>Secure Payments</h2>
            <p style={styles.serviceText}>
              We ensure secure transactions with multiple payment options, including COD.
            </p>
          </div>

          {/* 24/7 Customer Support */}
          <div style={styles.serviceCard}>
            <img
              src="https://cdn-icons-png.flaticon.com/512/4812/4812393.png"
              alt="24/7 Support"
              style={styles.icon}
            />
            <h2 style={styles.serviceTitle}>24/7 Support</h2>
            <p style={styles.serviceText}>
              Our dedicated customer service team is available round the clock to assist you.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

// Styles for the Services page
const styles = {
  container: {
    fontFamily: "'Poppins', sans-serif",
    textAlign: "center",
    padding: "50px 20px",
    backgroundColor: "#f8f8f8",
    color: "#333",
  },
  header: {
    background: "linear-gradient(135deg, #fa4eba, #a663db, #5178fd)",
    color: "#fff",
    padding: "60px 20px",
    borderRadius: "10px",
  },
  title: {
    fontSize: "36px",
    fontWeight: "bold",
    marginBottom: "10px",
  },
  subtitle: {
    fontSize: "18px",
    maxWidth: "600px",
    margin: "0 auto",
  },
  serviceContainer: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    marginTop: "50px",
    gap: "30px",
  },
  serviceCard: {
    backgroundColor: "#fff",
    padding: "30px",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    width: "400px",
    textAlign: "center",
    transition: "transform 0.3s ease",
  },
  serviceTitle: {
    fontSize: "22px",
    fontWeight: "bold",
    margin: "15px 0 10px",
    color: "#222",
  },
  serviceText: {
    fontSize: "16px",
    lineHeight: "1.5",
  },
  icon: {
    width: "80px",
    height: "80px",
  },
};

export default Services;
