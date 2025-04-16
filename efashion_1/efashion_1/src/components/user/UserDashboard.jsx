import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaHeart } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import Toastify styles
import ReviewForm from "../review/ReviewForm";
import ReviewList from "../review/ReviewList";

const UserDashboard = () => {
    const [products, setProducts] = useState([]);
    const [cartItems, setCartItems] = useState([]);
    const [wishlist, setWishlist] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [priceRange, setPriceRange] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get("/product/getAllProduct");
                setProducts(response.data.data);
            } catch (error) {
                console.error("Error fetching products:", error);
                toast.error("Failed to load products!");
            }
        };
        fetchProducts();
    }, []);

    const handleAddToCart = async (productId) => {
        try {
            const userId = localStorage.getItem("id");
            await axios.post("/cart/addtocart", { userId, productId, quantity: 1 });
            toast.success("🛒 Product added to cart!");
        } catch (error) {
            console.error("Error adding product to cart:", error);
            toast.error("❌ Failed to add to cart");
        }
    };

    const handleWishlist = async (product) => {
        try {
            const userId = localStorage.getItem("id");
            if (!userId) {
                toast.error("🔒 Please login to add to wishlist!");
                return;
            }

            await axios.post("/wishlist/add", { productId: product._id, userId });
            setWishlist([...wishlist, product]);
            toast.success("❤️ Added to Wishlist!");
            navigate("/user/wishlist");
        } catch (error) {
            console.error("Error adding to wishlist:", error);
            toast.error("❌ Failed to add to Wishlist");
        }
    };

    // Filter products based on search term and price range
    const filteredProducts = products.filter((product) =>
        product.productName.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (priceRange === "" || product.offerPrice <= parseInt(priceRange))
    );

    return (
        <div className="user-dashboard" style={{ padding: "20px" }}>
            <h1 className="dashboard-title" style={{ textAlign: "center", marginBottom: "20px" }}>🛍 Available Products</h1>

            {/* Search and Filter Section */}
            <div className="search-filter-section" style={{
                display: "flex",
                justifyContent: "center",
                gap: "15px",
                marginBottom: "20px"
            }}>
                <input
                    type="text"
                    placeholder="🔍 Search products..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{
                        padding: "10px",
                        width: "300px",
                        borderRadius: "25px",
                        border: "1px solid #ccc",
                        outline: "none",
                        textIndent: "10px",
                        boxShadow: "2px 2px 5px rgba(0,0,0,0.1)"
                    }}
                />
                <select
                    value={priceRange}
                    onChange={(e) => setPriceRange(e.target.value)}
                    style={{
                        padding: "10px",
                        borderRadius: "25px",
                        border: "1px solid #ccc",
                        outline: "none",
                        cursor: "pointer",
                        boxShadow: "2px 2px 5px rgba(0,0,0,0.1)"
                    }}
                >
                    <option value="">All Prices</option>
                    <option value="500">Up to ₹500</option>
                    <option value="1000">Up to ₹1000</option>
                    <option value="2000">Up to ₹2000</option>
                    <option value="5000">Up to ₹5000</option>
                </select>
            </div>

            <div className="product-grid" style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
                gap: "20px",
                justifyContent: "center"
            }}>
                {filteredProducts.length > 0 ? (
                    filteredProducts.map((product) => (
                        <div key={product._id} className="product-card" style={{
                            border: "1px solid #ddd",
                            padding: "15px",
                            borderRadius: "10px",
                            boxShadow: "3px 3px 10px rgba(0,0,0,0.1)",
                            backgroundColor: "#fff",
                            textAlign: "center"
                        }}>
                            <div className="product-images" style={{ marginBottom: "10px" }}>
                                <img src={product.productImageUrl1} alt="Product 1" style={{ width: "80px", height: "80px", marginRight: "5px" }} />
                                <img src={product.productImageUrl2} alt="Product 2" style={{ width: "80px", height: "80px", marginRight: "5px" }} />
                                <img src={product.productImageUrl3} alt="Product 3" style={{ width: "80px", height: "80px" }} />
                            </div>
                            <h2 className="product-name" style={{ fontSize: "18px", margin: "10px 0" }}>{product.productName}</h2>
                            <p className="product-price" style={{ fontSize: "16px", fontWeight: "bold" }}>
                                <span style={{ textDecoration: "line-through", color: "gray", marginRight: "10px" }}>₹{product.basePrice}</span>
                                <span style={{ color: "green" }}>₹{product.offerPrice}</span>
                            </p>
                            <div className="product-actions" style={{ display: "flex", justifyContent: "center", gap: "10px" }}>
                                <button 
                                    style={{
                                        backgroundColor: "#28a745",
                                        color: "white",
                                        border: "none",
                                        padding: "8px 12px",
                                        borderRadius: "5px",
                                        cursor: "pointer",
                                        transition: "0.3s",
                                    }}
                                    onClick={() => handleAddToCart(product._id)}
                                    onMouseOver={(e) => e.target.style.backgroundColor = "#218838"}
                                    onMouseOut={(e) => e.target.style.backgroundColor = "#28a745"}
                                >
                                    Add to Cart
                                </button>
                                <div 
                                    style={{ 
                                        display: "flex", 
                                        alignItems: "center", 
                                        cursor: "pointer", 
                                        color: "red", 
                                        fontWeight: "bold",
                                        transition: "0.3s"
                                    }} 
                                    onClick={() => handleWishlist(product)}
                                    onMouseOver={(e) => e.target.style.color = "#b30000"}
                                    onMouseOut={(e) => e.target.style.color = "red"}
                                >
                                    <FaHeart style={{ fontSize: "20px", marginRight: "5px" }} />
                                    <span>Wishlist</span>
                                </div>
                            </div>
                            <div style={{ width: "100%",marginTop: "15px"}}>
                                      <ReviewForm productId={product._id} />
                                      <ReviewList productId={product._id} />
                         </div>
                        </div>
                    ))
                ) : (
                    <p style={{ textAlign: "center", color: "gray" }}>No products available</p>
                )}
            </div>

            {/* Toastify Notification Container */}
            <ToastContainer position="top-center" autoClose={2000} hideProgressBar theme="colored" />
        </div>
    );
};

export default UserDashboard;
