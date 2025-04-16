import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  Store,
  ShoppingCart,
  PackageCheck,
  PackageX,
  DollarSign,
  Boxes,
  LogOut,
} from "lucide-react";

import {
  LineChart,
  Line,
  PieChart,
  Pie,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell
} from "recharts";

// Dummy data for charts
const revenueData = [
  { month: "Jan", revenue: 3000 },
  { month: "Feb", revenue: 5000 },
  { month: "Mar", revenue: 4000 },
  { month: "Apr", revenue: 6000 },
  { month: "May", revenue: 7200 },
];

const orderData = [
  { status: "Pending", value: 16 },
  { status: "Completed", value: 289 },
];

const colors = ["#fa4eba", "#5178fd"];

const AdminDashboard = () => {
  const [activeView, setActiveView] = useState("dashboard");
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/login");
  };

  const renderContent = () => {
    switch (activeView) {
      case "users":
        return (
          <div style={styles.fullWidthSection}>
            <h2 style={styles.sectionTitle}>User Management</h2>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>ID</th>
                  <th style={styles.th}>Name</th>
                  <th style={styles.th}>Email</th>
                  <th style={styles.th}>Role</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={styles.td}>1</td>
                  <td style={styles.td}>rohit</td>
                  <td style={styles.td}>rohit@gmail.com</td>
                  <td style={styles.td}>User</td>
                </tr>
                <tr>
                  <td style={styles.td}>2</td>
                  <td style={styles.td}>anant</td>
                  <td style={styles.td}>anant@gmail.com</td>
                  <td style={styles.td}>User</td>
                </tr>
                <tr>
                  <td style={styles.td}>3</td>
                  <td style={styles.td}>chandaben</td>
                  <td style={styles.td}>kuwarchandra346@gmail.com</td>
                  <td style={styles.td}>User</td>
                </tr>
              </tbody>
            </table>
          </div>
        );

      case "sellers":
        return (
          <div style={styles.fullWidthSection}>
            <h2 style={styles.sectionTitle}>Seller Management</h2>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>ID</th>
                  <th style={styles.th}>Name</th>
                  <th style={styles.th}>Shop</th>
                  <th style={styles.th}>Email</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={styles.td}>1</td>
                  <td style={styles.td}>akshayrajsinhrathod</td>
                  <td style={styles.td}>E-fashion</td>
                  <td style={styles.td}>akshayrajsinhrathod@gmail.com</td>
                </tr>
              </tbody>
            </table>
          </div>
        );

      case "orders":
        return (
          <div style={styles.fullWidthSection}>
            <h2 style={styles.sectionTitle}>All Orders</h2>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>Order ID</th>
                  <th style={styles.th}>Customer</th>
                  <th style={styles.th}>Status</th>
                  <th style={styles.th}>Total</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={styles.td}>1001</td>
                  <td style={styles.td}>Rohit</td>
                  <td style={styles.td}>Completed</td>
                  <td style={styles.td}>Rs6500</td>
                </tr>
                <tr>
                  <td style={styles.td}>1002</td>
                  <td style={styles.td}>anant</td>
                  <td style={styles.td}>Completed</td>
                  <td style={styles.td}>Rs5500</td>
                </tr>
                <tr>
                  <td style={styles.td}>1003</td>
                  <td style={styles.td}>chandaben</td>
                  <td style={styles.td}>Completed</td>
                  <td style={styles.td}>Rs9800</td>
                </tr>
              </tbody>
            </table>
          </div>
        );

      default:
        return (
          <>
            <h1 style={styles.heading}>Admin Dashboard</h1>
            <div style={styles.cardContainer}>
              <div style={styles.card}>
                <Users size={28} style={styles.cardIcon} />
                <h3 style={styles.cardTitle}>Total Users</h3>
                <p style={styles.cardValue}>124</p>
              </div>
              <div style={styles.card}>
                <Store size={28} style={styles.cardIcon} />
                <h3 style={styles.cardTitle}>Total Sellers</h3>
                <p style={styles.cardValue}>58</p>
              </div>
              <div style={styles.card}>
                <Boxes size={28} style={styles.cardIcon} />
                <h3 style={styles.cardTitle}>Total Products</h3>
                <p style={styles.cardValue}>342</p>
              </div>
              <div style={styles.card}>
                <PackageX size={28} style={styles.cardIcon} />
                <h3 style={styles.cardTitle}>Pending Orders</h3>
                <p style={styles.cardValue}>16</p>
              </div>
              <div style={styles.card}>
                <PackageCheck size={28} style={styles.cardIcon} />
                <h3 style={styles.cardTitle}>Completed Orders</h3>
                <p style={styles.cardValue}>289</p>
              </div>
              <div style={styles.card}>
                <DollarSign size={28} style={styles.cardIcon} />
                <h3 style={styles.cardTitle}>Revenue</h3>
                <p style={styles.cardValue}>$12,430</p>
              </div>
            </div>

            {/* Charts */}
            <div style={styles.chartSection}>
              <div style={styles.chartBox}>
                <h3 style={styles.chartTitle}>Monthly Revenue</h3>
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart data={revenueData}>
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="revenue" stroke="#5178fd" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              <div style={styles.chartBox}>
                <h3 style={styles.chartTitle}>Order Status</h3>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie data={orderData} dataKey="value" nameKey="status" outerRadius={80} fill="#8884d8" label>
                      {orderData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </>
        );
    }
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.navbar}>
        <h2 style={styles.navTitle}>E-Fashion Admin Panel</h2>
        <button onClick={handleLogout} style={styles.logoutButton}>
          <LogOut size={16} style={{ marginRight: "8px" }} />
          Logout
        </button>
      </div>

      <div style={styles.main}>
        <div style={styles.sidebar}>
          <ul style={styles.sidebarList}>
            <li style={styles.sidebarItem} onClick={() => setActiveView("dashboard")}>
              <LayoutDashboard size={18} style={styles.icon} />
              Dashboard
            </li>
            <li style={styles.sidebarItem} onClick={() => setActiveView("users")}>
              <Users size={18} style={styles.icon} />
              Users
            </li>
            <li style={styles.sidebarItem} onClick={() => setActiveView("sellers")}>
              <Store size={18} style={styles.icon} />
              Sellers
            </li>
            <li style={styles.sidebarItem} onClick={() => setActiveView("orders")}>
              <ShoppingCart size={18} style={styles.icon} />
              Orders
            </li>
          </ul>
        </div>

        <div style={styles.content}>{renderContent()}</div>
      </div>
    </div>
  );
};

const styles = {
  wrapper: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
    fontFamily: "Segoe UI, sans-serif",
    backgroundColor: "#f2f2f2",
  },
  navbar: {
    background: "linear-gradient(135deg, #fa4eba, #a663db, #5178fd)",
    color: "#fff",
    padding: "15px 30px",
    boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  navTitle: {
    margin: 0,
    fontSize: "22px",
  },
  logoutButton: {
    backgroundColor: "#ffffff",
    color: "#000000",
    border: "1px solid #ccc",
    padding: "6px 12px",
    fontSize: "13px",
    borderRadius: "5px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "6px",
    cursor: "pointer",
    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
    transition: "all 0.2s ease-in-out",
    width: "fit-content",
    height: "36px",
  },
  main: {
    display: "flex",
    flex: 1,
  },
  sidebar: {
    width: "240px",
    background: "rgb(115, 2, 245)",
    padding: "20px 0",
    height: "100%",
    color: "#fff",
  },
  sidebarList: {
    listStyle: "none",
    margin: 0,
    padding: 0,
  },
  sidebarItem: {
    padding: "12px 20px",
    cursor: "pointer",
    fontSize: "16px",
    display: "flex",
    alignItems: "center",
    gap: "10px",
    transition: "background 0.3s",
    borderBottom: "1px solid rgba(255,255,255,0.1)",
  },
  icon: {
    color: "#fff",
  },
  content: {
    flex: 1,
    padding: "30px",
    backgroundColor: "#ffffff",
    overflowY: "auto",
    width:"1293px"
  },
  heading: {
    fontSize: "28px",
    fontWeight: "600",
    marginBottom: "20px",
    color: "#222",
  },
  cardContainer: {
    display: "flex",
    flexWrap: "wrap",
    gap: "20px",
  },
  card: {
    flex: "1 1 calc(33% - 20px)",
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
    textAlign: "center",
    minWidth: "250px",
  },
  cardIcon: {
    color: "#5178fd",
    marginBottom: "8px",
  },
  cardTitle: {
    fontSize: "18px",
    color: "#555",
    marginBottom: "10px",
  },
  cardValue: {
    fontSize: "26px",
    fontWeight: "bold",
    color: "#0077b6",
  },
  sectionTitle: {
    fontSize: "22px",
    fontWeight: "600",
    marginBottom: "20px",
    color: "#222",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    marginTop: "10px",
  },
  th: {
    padding: "12px 16px",
    backgroundColor: "#f1f1f1",
    border: "1px solid #ddd",
    textAlign: "left",
  },
  td: {
    padding: "12px 16px",
    border: "1px solid #ddd",
    backgroundColor: "#fff",
  },
  fullWidthSection: {
    width: "100%",
  },
  chartSection: {
    display: "flex",
    flexWrap: "wrap",
    gap: "20px",
    marginTop: "40px",
  },
  chartBox: {
    flex: "1 1 45%",
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
  },
  chartTitle: {
    fontSize: "18px",
    fontWeight: "600",
    marginBottom: "15px",
    color: "#333",
  },
};

export default AdminDashboard;
