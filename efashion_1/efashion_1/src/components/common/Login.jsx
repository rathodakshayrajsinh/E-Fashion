import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import "../../assets/style.css";
import { toast, ToastContainer } from "react-toastify";

export const Login = () => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [showForgotModal, setShowForgotModal ] = useState(false);

  const submitHandler = async (data) => {
    try {
      const res = await axios.post("/user/login", data);
      console.log(res);
  
      if (res.status === 200) {
        alert("Login successful!");
        localStorage.setItem("id", res.data.data._id);
        const role = res.data.data.roleId.name.toLowerCase();
        localStorage.setItem("role", role);
  
        if (role === "customer") {
          navigate("/user");
        } else if (role === "seller") {
          navigate("/seller/dashboard");
        } else if (role === "admin") {
          navigate("/admin/dashboard");
        }
      } else {
        alert("Login failed. Please try again.");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("An error occurred. Please check your credentials and try again.");
    }
  };  
      
      const handleForgotPassword = async () => {
      if (!email)  {
       toast.error("please enter your email.");
      return;
      }

      try {
        const res = await axios.post("/user/forgotpassword",{ email });
        toast.success(res.data.message);
        setShowForgotModal(false);
      }catch(error) {
        toast.error(error.response?.data?.message || "error sending reset link.");

      }

      



      }


  return (
    <>
    <ToastContainer position="top-center" autoClose={2000} />
    <div style={styles.container}>
      <div style={styles.formBox}>
        <h1 style={styles.heading}>LOGIN</h1>
        <form onSubmit={handleSubmit(submitHandler)}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Email</label>
            <input
              type="text"
              {...register("email")}
              required
              style={styles.input}
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Password</label>
            <input
              type="password"
              {...register("password")}
              required
              style={styles.input}
            />
            {/* Forgot Password Link */}
            <p style={styles.forgotPassword}>
            <a href="#" onClick={() => setShowForgotModal(true)} style={{ color: "#ff4757", textDecoration: "none", fontWeight: "bold" }}>Forgot Password?</a>
            </p>
          </div>

          <div style={styles.buttonContainer}>
            <button type="submit" style={styles.button}>Login</button>
          </div>

          <p style={styles.signupRedirect}>
            Don't have an account? <Link to="/signup" style={styles.signupLink}>Sign up here</Link>
          </p>
        </form>
      </div>
    </div>
    {showForgotModal && (
        <div className="modal d-block" tabIndex="-1" style={{ background: "rgba(0, 0, 0, 0.5)" }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Forgot Password</h5>
                <button type="button" className="btn-close" onClick={() => setShowForgotModal(false)}></button>
              </div>
              <div className="modal-body">
                <input type="email" className="form-control" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={() => setShowForgotModal(false)}>Close</button>
                <button className="btn btn-info" onClick={handleForgotPassword}>Send Reset Link</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "rgb(45, 16, 113)",
  },
  formBox: {
    width: "600px",
    padding: "25px",
    backgroundColor: "#fff",
    borderRadius: "10px",
    boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.1)",
    textAlign: "center",
  },
  heading: {
    fontSize: "26px",
    fontWeight: "bold",
    color: "#ff6200",
    marginBottom: "20px",
  },
  inputGroup: {
    marginBottom: "15px",
    textAlign: "left",
  },
  label: {
    display: "block",
    fontWeight: "bold",
    marginBottom: "5px",
    color: "#333",
  },
  input: {
    width: "100%",
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    fontSize: "16px",
  },
  forgotPassword: {
    textAlign: "right",
    marginTop: "5px",
  },
  forgotPasswordLink: {
    color: "#ff6200",
    textDecoration: "none",
    fontSize: "14px",
  },
  buttonContainer: {
    textAlign: "center",
  },
  button: {
    width: "100%",
    padding: "10px",
    backgroundColor: "#ff6200",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    fontSize: "18px",
    cursor: "pointer",
    transition: "background-color 0.2s",
  },
  signupRedirect: {
    marginTop: "15px",
    fontSize: "14px",
    color: "#555",
  },
  signupLink: {
    color: "#ff6200",
    textDecoration: "none",
    fontWeight: "bold",
  },
};

export default Login;
