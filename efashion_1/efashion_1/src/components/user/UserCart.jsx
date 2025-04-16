import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const UserCart = () => {
    const [cartItems, setCartItems] = useState([]);
    const [totalAmount, setTotalAmount] = useState(0); // Store total amount
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCartItems = async () => {
            try {
                const Id = localStorage.getItem("id"); // Get user ID from localStorage
                const response = await axios.get(`/cart/getCartByUserId/${Id}`);
                setCartItems(response.data.data);
            } catch (error) {
                console.error("Error fetching cart items:", error);
            }
        };

        fetchCartItems();
    }, []);

    // Calculate total amount whenever cartItems change
    useEffect(() => {
        const total = cartItems.reduce((sum, item) => sum + (item.productId.offerPrice * item.quantity), 0);
        setTotalAmount(total);
    }, [cartItems]);

    const handleRemoveFromCart = async (productId) => {
        try {
            await axios.delete(`/cart/removeFromCart/${productId}`);
            setCartItems(cartItems.filter((item) => item.productId._id !== productId));
        } catch (error) {
            console.error("Error removing item from cart:", error);
        }
    };

    const handleQuantityChange = async (productId, newQuantity) => {
        try {
            await axios.put("/cart/updateQuantity", { productId, quantity: newQuantity });
            setCartItems(cartItems.map((item) => 
                item.productId._id === productId ? { ...item, quantity: newQuantity } : item
            ));
        } catch (error) {
            console.error("Error updating quantity:", error);
        }
    };

    const handleBuyNow = () => {
        localStorage.setItem("totalAmount", totalAmount); // Store totalAmount in localStorage
        navigate("/payment");
    };

    return (
        <div className="cart-container" style={{ marginTop: "100px" }}>
            <h1 className="cart-title">Shopping Cart</h1>
            {cartItems.length > 0 ? (
                <>
                    <table className="cart-table">
                        <thead>
                            <tr>
                                <th>Image</th>
                                <th>Product</th>
                                <th>Price</th>
                                <th>Quantity</th>
                                <th>Total</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cartItems.map((item) => (
                                <tr key={item.productId._id}>
                                    <td><img src={item.productId.productImageUrl1} alt="Product" className="cart-image" /></td>
                                    <td>{item.productId.productName}</td>
                                    <td>₹{item.productId.offerPrice}</td>
                                    <td>
                                        <input
                                            type="number"
                                            min="1"
                                            value={item.quantity}
                                            onChange={(e) => handleQuantityChange(item.productId._id, parseInt(e.target.value))}
                                        />
                                    </td>
                                    <td>₹{item.productId.offerPrice * item.quantity}</td>
                                    <td>
                                        <button className="remove-btn" onClick={() => handleRemoveFromCart(item.productId._id)}>Remove</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                        {/* Total Amount Row */}
                        <tfoot>
                            <tr>
                                <td colSpan="4" style={{ textAlign: "right", fontWeight: "bold" }}>Total Amount:</td>
                                <td style={{ fontWeight: "bold" }}>₹{totalAmount}</td>
                                <td></td>
                            </tr>
                        </tfoot>
                    </table>

                    <button className="buy-btn" onClick={handleBuyNow}>Buy Now</button>
                </>
            ) : (
                <p>Your cart is empty.</p>
            )}
        </div>
    );
};

export default UserCart;
