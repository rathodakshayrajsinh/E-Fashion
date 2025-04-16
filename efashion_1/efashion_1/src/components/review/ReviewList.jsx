import { useEffect, useState } from "react";
import axios from "axios";

const ReviewList = ({ productId }) => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    axios.get(`/review/getReviewByBikeid/${productId}`)
      .then((res) => {
        console.log("✅ Fetched Reviews:", res.data);
        setReviews(res.data.data);
      })
      .catch((err) => {
        console.error("❌ Error fetching reviews:", err);
      });
  }, [productId]);

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>🌟 User Reviews</h2>

      {reviews && reviews.length > 0 ? (
        reviews.map((review) => (
          <div key={review._id} style={styles.reviewCard}>
            {/* User Avatar & Name */}
            <div style={styles.userInfo}>
              <div style={styles.avatar}>{review.userId.firstName?.charAt(0).toUpperCase() || "U"}</div>
              <p style={styles.userName}>{review.userId.firstName || "Unknown User"}</p>
            </div>

            {/* Star Rating */}
            <div style={styles.starRating}>
              {[...Array(5)].map((_, index) => (
                <span key={index} style={{ ...styles.star, color: index < review.rating ? "#ffcc00" : "#ddd" }}>
                  ★
                </span>
              ))}
            </div>

            {/* Review Comment */}
            <p style={styles.comment}>📝 {review.comment || "No comment provided"}</p>
          </div>
        ))
      ) : (
        <p style={styles.noReviews}>⚠ No reviews available for this product.</p>
      )}
    </div>
  );
};

// Updated Styles
const styles = {
  container: {
    maxWidth: "700px",
    margin: "40px auto",
    fontFamily: "'Inter', sans-serif",
    padding: "10px",
  },
  heading: {
    textAlign: "center",
    fontSize: "26px",
    color: "#222",
    fontWeight: "bold",
    marginBottom: "25px",
  },
  reviewCard: {
    background: "#fff",
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
    marginBottom: "20px",
    border: "1px solid #f1f1f1",
    transition: "transform 0.3s ease-in-out",
    cursor: "pointer",
  },
  userInfo: {
    display: "flex",
    alignItems: "center",
    marginBottom: "10px",
  },
  avatar: {
    width: "40px",
    height: "40px",
    backgroundColor: "#007bff",
    color: "#fff",
    borderRadius: "50%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "18px",
    fontWeight: "bold",
    marginRight: "10px",
  },
  userName: {
    fontWeight: "bold",
    fontSize: "16px",
    color: "#222",
  },
  starRating: {
    display: "flex",
    marginBottom: "8px",
  },
  star: {
    fontSize: "20px",
    transition: "color 0.3s",
  },
  comment: {
    fontSize: "15px",
    color: "#333",
    lineHeight: "1.6",
    marginTop: "5px",
    textAlign:"left"
  },
  noReviews: {
    color: "red",
    fontWeight: "bold",
    textAlign: "center",
    marginTop: "20px",
    fontSize: "16px",
  },
};

export default ReviewList;