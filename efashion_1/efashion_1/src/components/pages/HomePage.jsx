import React from "react";
import { FaFacebook, FaInstagram, FaTwitter, FaMoon, FaSun } from "react-icons/fa";


const HomePage = () => {
  const bestSellers = [
    "https://cdn.pixabay.com/photo/2016/06/20/21/46/sport-shoes-1470061_1280.jpg",
    "https://cdn.pixabay.com/photo/2016/11/23/18/12/bag-1854148_1280.jpg",
    "https://media.istockphoto.com/id/669111576/photo/adventure-time.webp?b=1&s=612x612&w=0&k=20&c=SDAWnSoNYd051rg3zkk_Olg3AeQozyktseq2qkmUhqw="
  ];

  const latestArrivals = [
    "https://media.istockphoto.com/id/930163632/photo/laughing-bearded-young-man-with-hat-and-smoker.jpg?s=2048x2048&w=is&k=20&c=29gq46nvuJFhystp0z8NbMCddiWC_YSh4QvgblmjaxA=",
    "https://cdn.pixabay.com/photo/2014/11/09/19/17/mens-shirt-524022_1280.jpg",
    "https://cdn.pixabay.com/photo/2017/11/14/06/18/shirt-2947549_1280.jpg"
  ];

  return (
    <div style={styles.homeContainer}>
      <header style={styles.navbar}>
        <div style={styles.logo}>E-Fashion</div>
        <nav>
          <ul style={styles.navList}>
            <li><a href="/" style={styles.navLink}>Home</a></li>
            <li><a href="/about" style={styles.navLink}>About</a></li>
            <li><a href="/services" style={styles.navLink}>Service</a></li>
            <li><a href="/contact" style={styles.navLink}>Contact</a></li>
          </ul>
        </nav>
      </header>

      <section style={styles.heroSection}>
        <h1>Elevate Your Fashion</h1>
        <p>Discover the latest trends curated just for you</p>
        <button style={styles.exploreBtn} onClick={() => window.location.href = "/login"}>
          Explore Now
        </button>
      </section>

      <section style={styles.bestSellers}>
        <h2>Best Sellers</h2>
        <div style={styles.productsGrid}>
          {bestSellers.map((image, index) => (
            <div key={index} style={styles.productCard}>
              <img src={image} alt="Best Seller" style={styles.productImage} />
            </div>
          ))}
        </div>
      </section>

      <section style={styles.latestArrivals}>
        <h2>Latest Arrivals</h2>
        <div style={styles.productsGrid}>
          {latestArrivals.map((image, index) => (
            <div key={index} style={styles.productCard}>
              <img src={image} alt="Latest Arrival" style={styles.productImage} />
            </div>
          ))}
        </div>
        <button style={styles.viewMore}>View More</button>
      </section>
      <section style={{ marginTop: "70px", padding: "50px", backgroundColor: "#f0f8ff" }}>
        <h2>Our Trusted Partners</h2>
        <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: "400px", marginTop: "45px" }}>
          {[
            "https://4.bp.blogspot.com/-BGYw9I05BVk/TiRdC7c0NzI/AAAAAAAAAiQ/1ebLElEEGCc/s1600/Nike_logo.jpg",
            "http://2.bp.blogspot.com/-qaXQH8brdS8/UTJrGVjyDHI/AAAAAAAAABg/KTCk38iZJ9k/s1600/Logo+Puma.jpg",
            "http://pngimg.com/uploads/adidas/adidas_PNG8.png"
          ].map((logo, index) => (
            <img key={index} src={logo} alt={`partner-${index}`} style={{ height: "60px" }} />
          ))}
        </div>
      </section>
      <section style={{ marginTop: "60px", width: "100vw" }}>
        <h2>Trending Categories</h2>
        <div style={{ display: "flex", justifyContent: "center", gap: "30px", flexWrap: "wrap", padding: "40px" }}>
          {[
            { name: "Shoes", img: "https://cdn.pixabay.com/photo/2017/07/30/15/49/adidas-2554690_1280.jpg" },
            { name: "Bags", img: "https://cdn.pixabay.com/photo/2015/11/20/03/53/package-1052370_1280.jpg" },
            { name: "Watches", img: "https://cdn.pixabay.com/photo/2017/03/03/04/31/clock-2113254_1280.jpg" },
          ].map((item, index) => (
            <div key={index} style={{ width: "250px", textAlign: "center" }}>
              <img src={item.img} alt={item.name} style={{ width: "100%", borderRadius: "10px" }} />
              <h4>{item.name}</h4>
            </div>
          ))}
        </div>
      </section>
      <section style={{ marginTop: "75px", backgroundColor: "#f0f0f0", padding: "50px 20px" }}>
        <h2>Why Choose E-Fashion?</h2>
        <div style={{ display: "flex", justifyContent: "center", gap: "40px", flexWrap: "wrap" }}>
          {[
            { title: "Free Shipping", desc: "On all orders above ₹499" },
            { title: "Easy Returns", desc: "Hassle-free 7-day return policy" },
            { title: "Secure Payment", desc: "Your data is safe with us" },
          ].map((item, index) => (
            <div key={index} style={{ width: "300px", padding: "20px", backgroundColor: "white", borderRadius: "10px", boxShadow: "0 4px 8px rgba(0,0,0,0.1)" }}>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>
      <section style={{ marginTop: "70px", padding: "40px 20px", backgroundColor: "#fff7f9" }}>
        <h2>From Our Blog</h2>
        <div style={{ display: "flex", justifyContent: "center", gap: "30px", flexWrap: "wrap" }}>
          {[
            {
              title: "Top 5 Winter Trends 2025",
              img: "http://3.bp.blogspot.com/-h-fzAlTHF68/UXgAZik840I/AAAAAAAABGM/8718WPwZUQ0/s1600/fashion-blogs-by-kirstin-hanssen.jpg",
              desc: "Stay warm and stylish with these trending fashion ideas."
            },
            {
              title: "How to Accessorize Right",
              img: "http://media.gqindia.com/wp-content/uploads/2015/11/gq-mens-accessories-2015-1.jpg",
              desc: "Learn the art of matching accessories to your outfit."
            },
          ].map((blog, index) => (
            <div key={index} style={{ width: "320px", border: "1px solid #ddd", borderRadius: "10px", overflow: "hidden" }}>
              <img src={blog.img} alt={blog.title} style={{ width: "100%" }} />
              <div style={{ padding: "15px" }}>
                <h4>{blog.title}</h4>
                <p>{blog.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section style={styles.reviews}>
        <h2>Customer Reviews</h2>
        <div style={styles.reviewGrid}>
          {["Amazing quality!", "Highly recommend!", "Love the products!"].map((review, index) => (
            <div key={index} style={styles.reviewCard}>
              <p>"{review}"</p>
              <p>⭐⭐⭐⭐⭐</p>
            </div>
          ))}
        </div>
      </section>
      <section className="social-links" style={{ padding: "75px 0", textAlign: "center" }}>
        <h2>Follow Us</h2>
        <div style={{ display: "flex", justifyContent: "center", gap: "80px", padding: "30px" }}>
          <FaFacebook size={40} style={{ cursor: "pointer" }} />
          <FaInstagram size={40} style={{ cursor: "pointer" }} />
          <FaTwitter size={40} style={{ cursor: "pointer" }} />
        </div>
      </section>
      
      <section style={{ marginTop: "45px", background: "grey", color: "white", padding: "60px 20px", textAlign: "center",width:"105%" }}>
        <h2>Join the E-Fashion Family</h2>
        <p>Get the latest deals, exclusive discounts and fashion updates!</p>
        <button
          onClick={() => window.location.href = "/signup"}
          style={{ marginTop: "10px", padding: "20px 18px", backgroundColor: "#ff6f61", color: "white", fontSize: "1.0rem", border: "none", borderRadius: "25px" }}
        >
          Sign Up Now
        </button>
      </section>
      <footer className="footer" style={{ backgroundColor: "black", color: "white", padding: "45px", textAlign: "center", width: "105%" }}>
        <h3>Our Address</h3>
        <p>nana chiloda,Ahemdabad</p>
        <p>Email: akshayrajsinhrathod9@gmail.com</p>
        <p>Phone: 8511511699</p>
      </footer>
    </div>
  );
};

const styles = {
  homeContainer: {
    fontFamily: "Arial, sans-serif",
    textAlign: "center",
    padding: "0px",
    width: "95vw",
  },
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "20px",
    backgroundColor: " rgb(230, 78, 202)",
    color: "white",
    width: "100vw",
  },
  logo: { fontSize: "24px", fontWeight: "bold" },
  navList: {
    listStyle: "none",
    display: "flex",
    gap: "45px",
  },
  navLink: {
    color: "white",
    textDecoration: "none",
    fontSize: "18px",
  },
  heroSection: {
    padding: "150px 20px",
    background: "url('https://cdn.pixabay.com/photo/2013/11/14/12/34/neckties-210347_1280.jpg') no-repeat center center/cover",
    color: "white",
    width: "100vw",
  },
  exploreBtn: {
    padding: "20px 18px",
    backgroundColor: "#ff6f61",
    color: "white",
    border: "none",
    cursor: "pointer",
    width:"400px",
    fontSize:"2rem",
    borderRadius:"1rem"
  },
  bestSellers: { marginTop: "40px", width: "100vw" },
  latestArrivals: { marginTop: "40px", width: "100vw" },
  productsGrid: {
    display: "flex",
    justifyContent: "center",
    gap: "20px",
    width: "100vw",
  },
  productCard: {
    border: "1px solid #ddd",
    borderRadius: "10px",
    overflow: "hidden",
    width: "100vw",
  },
  productImage: {
    width: "100%",
    height: "auto",
  },
  viewMore: {
    marginTop: "45px",
    padding: "14px 12px",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    cursor: "pointer",
    width:"400px",
    fontSize:"2rem",
    borderRadius:"1rem"
  },
  reviews: { marginTop: "85px", width: "100vw" },
  reviewGrid: {
    display: "flex",
    justifyContent: "center",
    gap: "40px",
    width: "100vw",
  },
  reviewCard: {
    padding: "60px",
    backgroundColor: "#fff",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
    width: "100vw",
    
  },
  newsletter: {
    marginTop: "40px",
    padding: "20px",
    backgroundColor: "#f8f8f8",
    width: "100vw",
  },
  inputField: {
    padding: "10px",
    width: "250px",
    marginRight: "10px",
  },
  subscribeBtn: {
    padding: "10px 20px",
    backgroundColor: "#28a745",
    color: "white",
    border: "none",
    cursor: "pointer",
  },
};

export default HomePage;
