import React, { useEffect, useState } from "react";
import axios from "axios";

export const AdminHome = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

  // Fetch all users
  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await axios.get("/users"); // API to get all users
      setUsers(res.data);
    } catch (error) {
      setMessage("Failed to fetch users.");
    } finally {
      setLoading(false);
    }
  };

  // Delete user by ID
  const deleteUser = async (userId) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    try {
      await axios.delete(`/users/${userId}`); // API to delete user
      setUsers(users.filter(user => user._id !== userId));
      setMessage("User deleted successfully.");
    } catch (error) {
      setMessage("Failed to delete user.");
    }
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>Admin Dashboard</h1>

      {message && <p style={{ color: message.includes("Failed") ? "red" : "green" }}>{message}</p>}
      
      {loading ? (
        <p>Loading users...</p>
      ) : (
        <table border="1" cellPadding="10" style={{ margin: "auto", width: "80%", textAlign: "left" }}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((user) => (
                <tr key={user._id}>
                  <td>{user.firstName} {user.lastName}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td>
                    <button onClick={() => deleteUser(user._id)} style={{ color: "red" }}>Delete</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr><td colSpan="4">No users found.</td></tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminHome;
