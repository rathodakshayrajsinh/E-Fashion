import React, { useEffect, useState } from "react";
import axios from "axios";
import { Slide, toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const userId = localStorage.getItem("id");
        if (!userId) {
          setError("User ID not found in localStorage");
          setLoading(false);
          return;
        }

        console.log("Fetching wishlist for User ID:", userId);
        const response = await axios.get(`/wishlist/user/${userId}`);

        console.log("Wishlist Response:", response.data);

        if (response.data.success && Array.isArray(response.data.data)) {
          setWishlist(response.data.data);
        } else {
          setError("No wishlist data found");
        }
      } catch (error) {
        console.error("Error fetching wishlist:", error);
        setError("Failed to fetch wishlist");
      }
      setLoading(false);
    };

    fetchWishlist();
  }, []);

  const handleRemove = async (id) => {
    try {
      console.log(`Removing wishlist item with ID: ${id}`);

      const response = await axios.delete(`/wishlist/wishlist/${id}`);

      console.log("Remove Response:", response.data);

      if (response.data.success) {
        setWishlist(wishlist.filter((item) => item._id !== id));
        toast.success("Removed from wishlist!");
      } else {
        toast.error("Failed to remove item.");
      }
    } catch (error) {
      console.error("Error removing from wishlist:", error);
      toast.error("Error removing item.");
    }
  };

  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        transition={Slide}
        theme="colored"
      />

      <div style={styles.container}>
        <h2 style={styles.heading}>My Wishlist</h2>

        {loading ? (
          <p style={styles.message}>Loading wishlist...</p>
        ) : error ? (
          <p style={styles.error}>{error}</p>
        ) : wishlist.length === 0 ? (
          <p style={styles.message}>No items in wishlist.</p>
        ) : (
          <div style={styles.wishlistContainer}>
            {wishlist.map((item) => (
              <div key={item._id} style={styles.card}>
                {item.productId ? (
                  <>
                    {/* ✅ Product Images (Row Layout) */}
                    <div style={styles.imageRow}>
                      <img
                        src={item.productId.productImageUrl1}
                        alt="Product 1"
                        style={styles.image}
                      />
                      <img
                        src={item.productId.productImageUrl2}
                        alt="Product 2"
                        style={styles.image}
                      />
                      <img
                        src={item.productId.productImageUrl3}
                        alt="Product 3"
                        style={styles.image}
                      />
                    </div>

                    <p style={styles.price}>₹{item.productId.basePrice}</p>

                    <button
                      onClick={() => handleRemove(item._id)}
                      style={styles.button}
                    >
                      Remove
                    </button>
                  </>
                ) : (
                  <p style={styles.error}>Product details not available</p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

// ✅ Modern Styles (Row-Based Layout, Sleek Design)
const styles = {
  container: {
    maxWidth: "1400px",
    margin: "40px auto",
    padding: "30px",
    textAlign: "center",
    backgroundColor: "#ffffff",
    borderRadius: "12px",
    boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.1)",
  },
  heading: {
    fontSize: "28px",
    fontWeight: "bold",
    color: "#ff6200",
    marginBottom: "20px",
  },
  message: {
    fontSize: "18px",
    color: "#777",
  },
  error: {
    fontSize: "18px",
    color: "red",
  },
  wishlistContainer: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: "20px",
  },
  card: {
    width: "350px",
    backgroundColor: "#fff",
    borderRadius: "12px",
    padding: "15px",
    boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.1)",
    textAlign: "center",
    transition: "transform 0.3s ease-in-out",
    cursor: "pointer",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  imageRow: {
    display: "flex",
    justifyContent: "center",
    gap: "5px",
    marginBottom: "10px",
  },
  image: {
    width: "100px",
    height: "100px",
    borderRadius: "8px",
    objectFit: "cover",
    transition: "transform 0.2s",
  },
  price: {
    fontSize: "18px",
    fontWeight: "bold",
    marginTop: "10px",
  },
  button: {
    marginTop: "12px",
    padding: "10px 15px",
    borderRadius: "8px",
    border: "none",
    backgroundColor: "#ff4d4d",
    color: "#fff",
    fontWeight: "bold",
    cursor: "pointer",
    transition: "background-color 0.2s, transform 0.2s",
    width: "100%",
  },
};

export default Wishlist;
