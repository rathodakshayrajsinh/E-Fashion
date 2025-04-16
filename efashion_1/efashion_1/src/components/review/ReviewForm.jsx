import { useState } from "react";
import axios from "axios";

const ReviewForm = ({ productId }) => {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const userId = localStorage.getItem("id"); // Ensure userId is set

  const handleSubmit = async (e) => {
    e.preventDefault();
        

    try {
      const response = await axios.post("/review/addReview", {
        productId,
        userId,
        rating,
        comment,
      });

      console.log("✅ Review submitted successfully:", response.data);
    } catch (error) {
      console.error("❌ Error submitting review:", error.response?.data || error);
    }
  };

  // Star Rating Component
  const renderStars = () => {
    return [...Array(5)].map((_, index) => (
      <span
        key={index}
        onClick={() => setRating(index + 1)}
        style={{
          fontSize: "24px",
          cursor: "pointer",
          color: index < rating ? "#f7b731" : "#ccc",
          transition: "color 0.2s ease-in-out",
          marginRight: "5px",
        }}
      >
        ★
      </span>
    ));
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      style={{
        maxWidth: "450px",
        margin: "30px auto",
        padding: "25px",
        background: "#ffffff",
        boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
        borderRadius: "12px",
        border: "1px solid #ddd",
        fontFamily: "Arial, sans-serif"
      }}
    >
      <h3 style={{ fontSize: "22px", fontWeight: "bold", marginBottom: "20px", color: "#333", textAlign: "center" }}>
        Add Your Review
      </h3>
      
      {/* Star Rating Input */}
      <label style={{ display: "block", fontSize: "16px", fontWeight: "600", color: "#555", marginBottom: "10px" }}>
        Rating:
      </label>
      <div style={{ display: "flex", alignItems: "center", marginBottom: "20px" }}>
        {renderStars()}
      </div>

      {/* Comment Input */}
      <label style={{ display: "block", fontSize: "16px", fontWeight: "600", color: "#555", marginBottom: "10px" }}>
        Your Review:
      </label>
      <textarea 
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        style={{
          width: "100%",
          padding: "12px",
          borderRadius: "8px",
          border: "1px solid #ccc",
          fontSize: "14px",
          outline: "none",
          transition: "0.3s",
          resize: "none",
          height: "100px",
          background: "#f9f9f9",
        }}
        placeholder="Write your review here..."
      />

      {/* Submit Button */}
      <button 
        type="submit"
        style={{
          width: "100%",
          padding: "12px",
          marginTop: "20px",
          background: "#007bff",
          color: "#fff",
          fontSize: "16px",
          fontWeight: "bold",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
          transition: "0.3s",
        }}
        onMouseOver={(e) => e.target.style.background = "#0056b3"}
        onMouseOut={(e) => e.target.style.background = "#007bff"}
      >
        Submit Review
      </button>
    </form>
  );
};

export default ReviewForm;