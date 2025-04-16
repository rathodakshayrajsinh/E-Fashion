import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ProductList = () => {
  const [products, setProducts] = useState([]);

  const getAllMyProducts = async () => {
    try {
      const userId = localStorage.getItem("id");
      if (!userId) {
        console.error("User ID not found in localStorage");
        return;
      }
  
      const res = await axios.get(`/product/getAllProductByUserId/${userId}`);
      console.log("API Response:", res.data); // Log the response
  
      if (res.data && res.data.data) {
        setProducts(res.data.data);
      } else {
        setProducts([]); // Ensure products is always an array
      }
    } catch (error) {
      console.error("Error fetching products:", error.response?.data || error.message);
    }
  };
  useEffect(() => {
    getAllMyProducts();
  }, []);
  return (
    <div className="seller-home" style={{ marginTop: "100px" }}>
      <h2 className="title">My Products</h2>
      {products.length > 0 ? (
        <div className="product-grid">
          {products.map((product) => (
  <div className="product-card" key={product._id}>
    <h3 className="product-name">{product.productName}</h3>
    <div className="product-images">
      <img src={product?.productImageUrl1} alt="Product 1" onError={(e) => console.log("Image 1 Error:", product.productImageUrl1)} />
      <img src={product?.productImageUrl2} alt="Product 2" onError={(e) => console.log("Image 2 Error:", product.productImageUrl2)} />
      <img src={product?.productImageUrl3} alt="Product 3" onError={(e) => console.log("Image 3 Error:", product.productImageUrl3)} />
    </div>
    <Link to={`/seller/product/${product._id}`} className="view-btn">View</Link>
  </div>
))}
        </div>
      ) : (
        <p className="no-products">No products found.</p>
      )}
    </div>
  );
};

export default ProductList;
