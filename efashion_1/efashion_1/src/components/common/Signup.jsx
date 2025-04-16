import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";

export const Signup = () => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  
  const submitHandler = async (data) => {
    try {
      const res = await axios.post("/user/signup", data)
      alert("User created successfully");
      console.log(res); 
      console.log(res.data); 
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div style={styles.signupContainer}>
      <h1 style={styles.heading}>Signup</h1>
      {message && <p style={{ ...styles.message, color: message.includes("success") ? "green" : "red" }}>{message}</p>}
      
      <form onSubmit={handleSubmit(submitHandler)} style={styles.signupForm}>
        <div style={styles.formColumns}>
          <div style={styles.inputGroup}>
            <label>Role</label>
            <select {...register("roleId", { required: "Please select a role" })} style={styles.input}>
              <option value="">Select Role</option>
              <option value="67e4d40e4e91dd31fa0840b6">Customer</option>
              <option value="67e4d3604e91dd31fa0840b2">Seller</option>
              <option value="67e4d3974e91dd31fa0840b4">admin</option>
            </select>
            {errors.roleId && <p style={styles.errorMessage}>{errors.roleId.message}</p>}
          </div>

          <div style={styles.inputGroup}>
            <label>First Name</label>
            <input type="text" {...register("firstName", { required: "First name is required" })} style={styles.input} />
            {errors.firstName && <p style={styles.errorMessage}>{errors.firstName.message}</p>}
          </div>

          <div style={styles.inputGroup}>
            <label>Last Name</label>
            <input type="text" {...register("lastName", { required: "Last name is required" })} style={styles.input} />
            {errors.lastName && <p style={styles.errorMessage}>{errors.lastName.message}</p>}
          </div>

          <div style={styles.inputGroup}>
            <label>Email</label>
            <input type="email" {...register("email", { required: "Email is required", pattern: { value: /^\S+@\S+\.\S+$/, message: "Invalid email format" } })} style={styles.input} />
            {errors.email && <p style={styles.errorMessage}>{errors.email.message}</p>}
          </div>

          <div style={styles.inputGroup}>
            <label>Phone Number</label>
            <input type="text" {...register("phone", { required: "Phone number is required", pattern: { value: /^[0-9]{10}$/, message: "Enter a valid 10-digit phone number" } })} style={styles.input} />
            {errors.phone && <p style={styles.errorMessage}>{errors.phone.message}</p>}
          </div>

          <div style={styles.inputGroup}>
            <label>Gender</label>
            <select {...register("gender", { required: "Please select a gender" })} style={styles.input}>
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
            {errors.gender && <p style={styles.errorMessage}>{errors.gender.message}</p>}
          </div>

          <div style={styles.inputGroup}>
            <label>Date of Birth</label>
            <input type="date" {...register("dob", { required: "Date of birth is required" })} style={styles.input} />
            {errors.dob && <p style={styles.errorMessage}>{errors.dob.message}</p>}
          </div>

          <div style={styles.inputGroup}>
            <label>Password</label>
            <input type="password" {...register("password", { required: "Password is required", minLength: { value: 6, message: "Password must be at least 6 characters" } })} style={styles.input} />
            {errors.password && <p style={styles.errorMessage}>{errors.password.message}</p>}
          </div>

          <div style={styles.inputGroup}>
            <label>Confirm Password</label>
            <input type="password" {...register("confirmPassword", { 
              required: "Please confirm your password",
              validate: value => value === watch("password") || "Passwords do not match"
            })} style={styles.input} />
            {errors.confirmPassword && <p style={styles.errorMessage}>{errors.confirmPassword.message}</p>}
          </div>
        </div>

        <div style={styles.buttonGroup}>
          <button type="submit" disabled={loading} style={styles.button}>
            {loading ? "Signing Up..." : "Sign Up"}
          </button>
        </div>

        <p style={styles.loginRedirect}>
          Already have an account? <Link to="/login" style={styles.loginLink}>Login here</Link>
        </p>
      </form>
    </div>
  );
};

const styles = {
  signupContainer: { textAlign: "center", padding: "40px", backgroundColor: "rgb(45, 16, 113)", minHeight: "100vh" },
  heading: { color: "#fff", marginBottom: "30px" },
  signupForm: { display: "inline-block", textAlign: "left", maxWidth: "800px", width: "100%", backgroundColor: "#fff", padding: "30px", borderRadius: "8px", boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)" },
  formColumns: { display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "20px" },
  inputGroup: { marginBottom: "15px" },
  input: { width: "100%", padding: "10px", marginTop: "5px", border: "1px solid #ccc", borderRadius: "5px", boxSizing: "border-box" },
  buttonGroup: { textAlign: "center", marginTop: "20px" },
  button: { width: "100%", padding: "12px", backgroundColor: "#ffcc00", border: "none", cursor: "pointer", fontSize: "16px", fontWeight: "bold", borderRadius: "5px" },
  loginRedirect: { marginTop: "15px", fontSize: "14px", color: "black" },
  loginLink: { color: "red", textDecoration: "none", fontWeight: "bold" }
};

export default Signup;