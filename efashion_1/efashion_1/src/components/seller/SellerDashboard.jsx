import React from "react";
import { Bar, Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, PointElement, LineElement, Filler } from "chart.js";


ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, PointElement, LineElement, Filler);

const SellerDashboard = () => {
  const ordersData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Total Orders",
        data: [30, 45, 60, 50, 70, 90],
        backgroundColor: "#4CAF50",
        borderRadius: 5,
      },
    ],
  };

  const earningsData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Earnings (₹)",
        data: [1000, 1500, 3000, 2500, 4000, 5300],
        borderColor: "#ff9800",
        backgroundColor: "rgba(255, 152, 0, 0.2)",
        fill: true,
        tension: 0.4,
      },
    ],
  };

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Seller Dashboard</h1>
      
      <div className="dashboard-grid">
        {/* Total Products */}
        <div className="dashboard-card">
          <h2 className="card-title">Total Products</h2>
          <p className="card-value">25</p>
        </div>
        
        {/* Total Orders with Mini Chart */}
        <div className="dashboard-card">
          <h2 className="card-title">Total Orders</h2>
          <p className="card-value">120</p>
          <div className="mini-chart">
            <Bar data={ordersData} options={{ responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } } }} />
          </div>
        </div>
        
        {/* Earnings with Mini Chart */}
        <div className="dashboard-card">
          <h2 className="card-title">Earnings</h2>
          <p className="card-value">₹5,300</p>
          <div className="mini-chart">
            <Line data={earningsData} options={{ responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } } }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerDashboard;
