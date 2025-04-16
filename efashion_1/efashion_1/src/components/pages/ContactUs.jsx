import React, { useState } from "react";
import { Link } from "react-router-dom"; // Import Link for navigation

const ContactUs = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Thank you for contacting us! We will get back to you soon.");
    setFormData({ name: "", email: "", message: "" });
  };

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
                    <li className="nav-item active">
                      <a className="nav-link" href="/">Home</a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" href="/about">About</a>
                    </li>
                    <li className="nav-item">
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

      {/* Contact Form Section */}
      <div style={styles.container}>
        <div style={styles.card}>
          <header style={styles.header}>
            <h1 style={styles.title}>
              Contact <span style={{ color: "#ffcc00" }}>Us</span>
            </h1>
            <p style={styles.subtitle}>Have questions? We’re here to help! Get in touch with us.</p>
          </header>

          <div style={styles.formContainer}>
            <form onSubmit={handleSubmit} style={styles.form}>
              <label style={styles.label}>Full Name</label>
              <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Enter your name" style={styles.input} required />

              <label style={styles.label}>Email</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Enter your email" style={styles.input} required />

              <label style={styles.label}>Message</label>
              <textarea name="message" value={formData.message} onChange={handleChange} placeholder="Type your message..." style={styles.textarea} required></textarea>

              <button type="submit" style={styles.button}>Send Message</button>
            </form>
          </div>

          <div style={styles.infoContainer}>
            <h2 style={styles.infoTitle}>Our Contact Details</h2>
            <p><strong>Email:</strong> akshayrajsinhrathod9@gmail.com</p>
            <p><strong>Phone:</strong> 8511511699</p>
            <p><strong>Address:</strong> Ahmedabad, India</p>
          </div>
        </div>
      </div>
    </>
  );
};

// Updated Full-Page Styling
const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    width: "100vw",
    background: "linear-gradient(to right, #f8f8f8, #e0e0e0)",
    padding: "40px",
  },
  card: {
    width: "10000px", // Make the card take up most of the screen width
    maxWidth: "3000px",
    backgroundColor: "#fff",
    borderRadius: "15px",
    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.2)",
    padding: "40px",
  },
  header: {
    background: "linear-gradient(135deg, #fa4eba, #a663db, #5178fd)",
    color: "#fff",
    padding: "60px",
    borderRadius: "12px",
    textAlign: "center",
    marginBottom: "30px",
  },
  title: {
    fontSize: "50px",
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  subtitle: {
    fontSize: "22px",
    maxWidth: "800px",
    margin: "0 auto",
    opacity: "0.9",
  },
  formContainer: {
    display: "flex",
    justifyContent: "center",
    width: "100%",
  },
  form: {
    backgroundColor: "#fff",
    padding: "50px",
    width: "100%",
    maxWidth: "900px",
    borderRadius: "12px",
    boxShadow: "0 5px 15px rgba(0, 0, 0, 0.1)",
  },
  label: {
    fontSize: "20px",
    fontWeight: "bold",
    display: "block",
    marginBottom: "10px",
  },
  input: {
    width: "100%",
    padding: "14px",
    marginBottom: "20px",
    border: "1px solid #ccc",
    borderRadius: "6px",
  },
  textarea: {
    width: "100%",
    height: "140px",
    padding: "14px",
    border: "1px solid #ccc",
    borderRadius: "6px",
  },
  button: {
    width: "100%",
    padding: "16px",
    backgroundColor: "#ffcc00",
    border: "none",
    cursor: "pointer",
    fontSize: "18px",
    fontWeight: "bold",
    borderRadius: "6px",
  },
  infoContainer: {
    padding: "40px",
    backgroundColor: "#f9f9f9",
    width: "100%",
    borderRadius: "12px",
    marginTop: "20px",
    textAlign: "center",
  },
  infoTitle: {
    fontSize: "28px",
    fontWeight: "bold",
    marginBottom: "10px",
  },
};

export default ContactUs;
