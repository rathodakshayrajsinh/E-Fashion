import React from "react";
import { Link } from "react-router-dom";

const AboutUs = () => {
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
                  <form className="form-inline">
                    <button className="btn my-2 my-sm-0 nav_search-btn" type="submit" />
                  </form>
                </div>
              </div>
            </nav>
          </div>
        </header>
      </div>

      {/* About Us Section */}
      <div style={styles.container}>
        <div style={styles.card}>
          <header style={styles.header}>
            <h1 style={styles.title}>
              About <span style={{ color: "#FFD700" }}>E-Fashion</span>
            </h1>
            <p style={styles.subtitle}>
              Your ultimate destination for the latest trends and fashion collections.
            </p>
          </header>

          <section style={styles.section}>
  <h2 style={styles.heading}>Our Mission</h2>
  <p style={styles.text}>
  At <strong>E-Fashion</strong>, our mission is to redefine the online fashion shopping experience. 
  We strive to deliver high-quality, trendy, and affordable fashion to customers from all walks of life. 
  Our goal is to make fashion accessible and inclusive, helping individuals express their identity and confidence through style. 
  We are committed to offering a diverse range of products, maintaining sustainability practices, and creating a seamless user experience 
  for both buyers and sellers. Whether you’re looking for casual wear or couture, E-Fashion ensures you’ll always find something that fits 
  your vibe without breaking the bank.
</p>
  <img
    src="https://www.sustainability-hub.jp/app/uploads/pre/YgkT7idAkVHJtfKWXXqRunOFqgFDG0gUgKm2zwG2.jpeg"
    alt="E-Fashion Mission"
    style={styles.visionImage}
  />
</section>


          <section style={styles.section}>
         <h2 style={styles.heading}>Our Vision</h2>
         <p style={styles.text}>
  We envision a world where fashion transcends barriers — where people can embrace who they are and feel empowered through 
  what they wear. At E-Fashion, we believe that style should not only be elegant and current, but also environmentally conscious 
  and inclusive. Our long-term vision is to become a globally recognized platform that champions both sustainability and individuality 
  in fashion. By collaborating with local artisans, emerging designers, and eco-friendly manufacturers, we aim to build a community-driven 
  ecosystem that supports creativity, diversity, and responsible consumption. Our platform is not just about selling clothes — it's about 
  building a movement that celebrates identity, culture, and change.
</p>
    <img
    src="https://cdn.pixabay.com/photo/2017/06/04/20/48/vision-2372177_1280.jpg"
    alt="E-Fashion Vision"
    style={styles.visionImage}
    />
   </section>
      <section style={styles.section}>
    <h2 style={styles.heading}>Meet Our Team</h2>
    <p style={styles.text}>
  The heart of E-Fashion lies in its team — a passionate, dynamic group of professionals with a shared love for fashion, 
  technology, and innovation. Our team is made up of experienced developers, visionary designers, and savvy marketers, all working 
  together to create an engaging and delightful user experience. From brainstorming new UI/UX designs, to optimizing backend 
  systems, to curating fashion collections that align with global trends — our team operates with a shared vision of excellence 
  and impact. We foster a collaborative culture that encourages innovation, creativity, and continuous learning, ensuring that 
  E-Fashion stays ahead of the curve and delivers the best to our users.
</p>
   <div style={styles.teamContainer}>
    <div style={styles.teamMember}>
      <img
        src="https://randomuser.me/api/portraits/women/44.jpg"
        alt="Team Member 1"
        style={styles.teamImage}
      />
      <p style={styles.memberName}>Priya mukherjee</p>
      <p style={styles.memberRole}>Frontend Developer</p>
    </div>
    <div style={styles.teamMember}>
      <img
        src="https://randomuser.me/api/portraits/men/32.jpg"
        alt="Team Member 2"
        style={styles.teamImage}
      />
      <p style={styles.memberName}>Rishab Patel</p>
      <p style={styles.memberRole}>Backend Developer</p>
    </div>
    <div style={styles.teamMember}>
      <img
        src="https://randomuser.me/api/portraits/women/65.jpg"
        alt="Team Member 3"
        style={styles.teamImage}
      />
      <p style={styles.memberName}>Dipa Roy</p>
      <p style={styles.memberRole}>UI/UX Designer</p>
    </div>
  </div>
</section>

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
    background: "linear-gradient(to right,rgb(255, 254, 255), #d9d9d9)",
    padding: "40px",
  },
  sectionImage: {
    width: "60%",
    maxWidth: "800px",
    marginTop: "30px",
    borderRadius: "10px",
    boxShadow: "0 8px 20px rgba(0, 0, 0, 0.1)",
    objectFit: "cover",
    display: "block",
    marginLeft: "auto",
    marginRight: "auto",
  },  
  card: {
    width: "20000px", // Make the card take up most of the screen width
    maxWidth: "2200px",
    backgroundColor: "#fff",
    borderRadius: "15px",
    boxShadow: "0 10px 30px rgba(176, 20, 145, 0.2)",
    overflow: "hidden",
    padding: "40px",
  },
  visionImage: {
    width: "60%",
    maxWidth: "800px",
    marginTop: "30px",
    borderRadius: "10px",
    boxShadow: "0 8px 20px rgba(0, 0, 0, 0.1)",
    objectFit: "cover",
    display: "block",
    marginLeft: "auto",
    marginRight: "auto",
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
  section: {
    marginTop: "30px",
    marginBottom: "50px", // Added bottom spacing
    padding: "60px",       // Increased padding
    borderRadius: "10px",
    backgroundColor: "#f9f9f9",
    boxShadow: "0 5px 15px rgba(0, 0, 0, 0.1)",
  },  
  heading: {
    fontSize: "36px",
    fontWeight: "bold",
    color: "#222",
    marginBottom: "20px",
    textTransform: "uppercase",
    textAlign: "center",
  },
  teamContainer: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    rowGap: "50px",      // Vertical spacing
    columnGap: "60px",   // Horizontal spacing
    marginTop: "50px",
  },
  teamMember: {
    textAlign: "center",
    maxWidth: "220px",
    padding: "10px", // Internal spacing for cards
  },
  teamImage: {
    width: "150px",
    height: "150px",
    borderRadius: "50%",
    objectFit: "cover",
    boxShadow: "0 5px 15px rgba(0,0,0,0.15)",
  },
  
  memberName: {
    marginTop: "15px",
    fontSize: "18px",
    fontWeight: "bold",
    color: "#333",
  },
  
  memberRole: {
    fontSize: "16px",
    color: "#777",
  },
  
  text: {
    fontSize: "20px",
    lineHeight: "1.8",
    color: "#555",
    textAlign: "center",
  },
};


export default AboutUs;
