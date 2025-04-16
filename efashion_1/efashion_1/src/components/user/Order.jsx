import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../assets/Order.css";

const Order = () => {
    const [orders, setOrders] = useState([]);
    const userId = localStorage.getItem("id");

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.get(`/orderdetails/getAllOrderDetailsByUserId/${userId}`);
                console.log("Orders Response:", response.data.data); // Debugging API response
                setOrders(response.data.data || []); // Ensure it's an array
            } catch (error) {
                console.error("Error fetching orders:", error);
            }
        };

        fetchOrders();
    }, [userId]);

    return (
        <div className="order-container">
            <h1 className="order-title">My Orders</h1>
            {orders.length > 0 ? (
                <table className="order-table">
                    <thead>
                        <tr>
                            <th>Order ID</th>
                            <th>Product</th>
                            <th>Quantity</th>
                            <th>Total Price</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order) => (
                            <tr key={order._id}>
                                <td>{order.orderId._id}</td>
                                <td>
                                    {order.productId.productName}
                                </td>
                                <td>
                                    {order.quantity}
                                </td>
                                <td>₹{order.orderId.totalAmount || 0}</td>
                                <td>{order.orderId.status}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No orders found.</p>
            )}
        </div>
    );
};

export default Order;
