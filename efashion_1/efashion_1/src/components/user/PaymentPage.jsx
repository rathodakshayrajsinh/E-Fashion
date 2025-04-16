import React, { useState, useEffect } from "react";
import "../../assets/PaymentPage.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const PaymentPage = () => {
    const [cardHolder, setCardHolder] = useState("");
    const [cardNumber, setCardNumber] = useState("");
    const [expiry, setExpiry] = useState("");
    const [cvv, setCvv] = useState("");
    const [cartItems, setCartItems] = useState([]);
    const [userId, setUserId] = useState(null);
    const [totalAmount, setTotalAmount] = useState(0); // Store total amount

    const navigate = useNavigate();

    useEffect(() => {
        // Retrieve userId and totalAmount from localStorage
        const storedUserId = localStorage.getItem("id");
        const storedTotalAmount = localStorage.getItem("totalAmount");

        if (storedUserId) {
            setUserId(storedUserId);
        } else {
            alert("User not logged in! Redirecting to login.");
            navigate("/login");
        }

        if (storedTotalAmount) {
            setTotalAmount(parseFloat(storedTotalAmount)); // Convert to number
        }
    }, []);

    useEffect(() => {
        const fetchCartItems = async () => {
            if (!userId) return;

            try {
                const response = await axios.get(`/cart/getCartByUserId/${userId}`);
                console.log(response.data.data);
                setCartItems(response.data.data);
            } catch (err) {
                console.error("Error fetching cart:", err);
            }
        };

        fetchCartItems();
    }, [userId]);

    const formatCardNumber = (value) => value.replace(/\D/g, "").slice(0, 16).match(/.{1,4}/g)?.join(" ") || "";
    const formatExpiry = (value) => value.replace(/\D/g, "").slice(0, 4).replace(/(\d{2})/, "$1/");
    const formatCvv = (value) => value.replace(/\D/g, "").slice(0, 3);

    const handlePayment = async (e) => {
        e.preventDefault();

        if (!userId) {
            alert("User ID missing! Please log in again.");
            return;
        }

        if (cartItems.length === 0) {
            alert("Your cart is empty!");
            return;
        }

        try {
            // Step 1: Create Order
            const orderRes = await axios.post("/order/addOrder", { userId, totalAmount });

            if (orderRes.status === 201) {
                const orderId = orderRes.data.data._id;

                // Step 2: Add Order Details
                await Promise.all(cartItems.map((item) =>
                    axios.post("/orderdetails/addOrderDetails", {
                        orderId,
                        productId: item.productId,
                        quantity: item.quantity
                    })
                ));

                // Step 3: Clear the Cart
                await axios.delete(`/cart/removeFromCart/${userId}`);

                alert("Payment Successful! Order Placed.");
                navigate("/user"); // Navigate to user dashboard
            }
        } catch (error) {
            console.error("Error processing payment:", error);
            alert("Payment failed. Try again.");
        }
    };

    return (
        <div className="payment-page">
            <div className="payment-container">
                <div className="payment-box">
                    <h2 className="payment-title">Payment Details</h2>
                    <p className="payment-subtitle">Total Amount: ₹{totalAmount.toFixed(2)}</p> {/* Display totalAmount */}

                    {/* Card Preview */}
                    <div className="card-preview float-animation">
                        <div className="card-number">{cardNumber || "•••• •••• •••• ••••"}</div>
                        <div className="card-details">
                            <div>
                                <span>Card Holder</span>
                                <div className="card-holder">{cardHolder || "YOUR NAME"}</div>
                            </div>
                            <div>
                                <span>Expires</span>
                                <div className="expiry">{expiry || "MM/YY"}</div>
                            </div>
                        </div>
                    </div>

                    {/* Payment Form */}
                    <form className="payment-form" onSubmit={handlePayment}>
                        <input
                            type="text"
                            value={cardHolder}
                            onChange={(e) => setCardHolder(e.target.value)}
                            placeholder="Card Holder Name"
                            required
                        />

                        <input
                            type="text"
                            value={cardNumber}
                            onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                            placeholder="Card Number"
                            maxLength="19"
                            required
                        />

                        <div className="form-row">
                            <input
                                type="text"
                                value={expiry}
                                onChange={(e) => setExpiry(formatExpiry(e.target.value))}
                                placeholder="MM/YY"
                                maxLength="5"
                                required
                            />
                            <input
                                type="password"
                                value={cvv}
                                onChange={(e) => setCvv(formatCvv(e.target.value))}
                                placeholder="CVV"
                                maxLength="3"
                                required
                            />
                        </div>

                        <button type="submit" className="pay-button">Pay ₹{totalAmount.toFixed(2)}</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default PaymentPage;
