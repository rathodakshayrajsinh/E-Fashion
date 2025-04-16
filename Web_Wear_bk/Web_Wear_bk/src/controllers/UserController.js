const userModel = require("../models/UserModel");

const mailUtil = require("../utils/MailUtil")

const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");

const secret = "secret";


const getAllUser = async (req, res) => {
  const allUser = await userModel.find().populate("roleId")
  res.status(200).send({
    message: "all User",
    data: allUser
  })
}

const signup = async (req, res) => {
  try {
    if (!req.body.password || typeof req.body.password !== "string") {
      return res.status(400).json({ message: "Invalid password input" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    req.body.password = hashedPassword;

    const createdUser = await userModel.create(req.body);
    await mailUtil.sendingMail(createdUser.email,"welcome to eFashion","this is welcome mail")

    res.status(201).json({
      message: "User created successfully",
      data: createdUser,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Error",
      data: err.message,
    });
  }
};



const loginUser = async (req, res) => {

  const email = req.body.email;
  const password = req.body.password;

  const foundUserFromEmail = await userModel.findOne({ email: email }).populate("roleId");
  console.log(foundUserFromEmail);

  if (foundUserFromEmail != null) {

    const isMatch = bcrypt.compareSync(password, foundUserFromEmail.password);

    if (isMatch == true) {
      res.status(200).json({
        message: "login success",
        data: foundUserFromEmail,
      });
    } else {
      res.status(404).json({
        message: "invalid cred..",
      });
    }
  } else {
    res.status(404).json({
      message: "Email not found..",
    });
  }
};


const getUserById = async (req, res) => {
  try {
    const foundUser = await userModel.findById(req.params.id);
    if (!foundUser) {
      return res.status(404).json({ message: "User not found." });
    }
    res.status(200).json({
      message: "User fetched successfully.",
      data: foundUser,
    });
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};


const deleteUserById = async (req, res) => {
  try {
    const deletedUser = await userModel.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      return res.status(404).json({ message: "User not found." });
    }
    res.status(200).json({
      message: "User deleted successfully.",
      data: deletedUser,
    });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

const userByName = async (req, res) => {
  try {
    const { firstName } = req.params; // Get name from URL parameters

    if (!firstName) {
      return res.status(400).json({ message: "Name is required" });
    }

    // Find user by name (case-insensitive)
    const user = await userModel.findOne({ firstName: new RegExp(`^${firstName}$`, "i") });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user); // Return user details
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const getUserProfile = async (req, res) => {
  try {
      const { userId } = req.params;
      const user = await userModel.findById(userId);

      if (!user) {
          return res.status(404).json({ message: "User not found" });
      }

      res.status(200).json({ data: user });
  } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ message: "Server error", error: error.message });
  }
};

const updateUserProfile = async (req, res) => {
  try {
      const { userId } = req.params;
      const updatedUser = await userModel.findByIdAndUpdate(userId, req.body, { new: true });

      if (!updatedUser) {
          return res.status(404).json({ message: "User not found" });
      }

      res.status(200).json({ message: "User updated successfully", data: updatedUser });
  } catch (error) {
      console.error("Error updating user:", error);
      res.status(500).json({ message: "Server error", error: error.message });
  }
};


const forgotPassword = async (req, res) => {
  console.log("🔍 Request Body:", req.body); // ✅ Debugging log
  const email = req.body.email;

  if (!email) {
    console.log("❌ Email is missing in request body.");
    return res.status(400).json({ message: "Email is required." });
  }

  const foundUser = await userModel.findOne({ email: email });

  if (!foundUser) {
    console.log("❌ User not found in database.");
    return res.status(404).json({ message: "User not found. Register first." });
  }

  console.log("✅ User found:", foundUser.email);

  const token = jwt.sign({ id: foundUser._id }, secret, { expiresIn: "1h" });
  console.log("✅ Generated Token:", token);

  const url = `http://localhost:5173/resetpassword/${token}`;
  const mailContent = `
  <html>
    <head>
      <style>
        body {
          font-family: Arial, sans-serif;
          background-color: #f4f4f4;
          text-align: center;
          padding: 20px;
        }
        .container {
          max-width: 500px;
          background: #ffffff;
          padding: 20px;
          border-radius: 10px;
          box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
          margin: auto;
        }
        h2 {
          color: #ff4757;
        }
        p {
          font-size: 16px;
          color: #333;
        }
        .btn {
          display: inline-block;
          padding: 12px 20px;
          font-size: 16px;
          color: #ffffff;
          background: #ff4757;
          text-decoration: none;
          border-radius: 5px;
          font-weight: bold;
        }
        .footer {
          margin-top: 20px;
          font-size: 12px;
          color: #777;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h2>Password Reset Request</h2>
        <p>We received a request to reset your password. Click the button below to reset it:</p>
        <a href="${url}" class="btn">Reset Password</a>
        <p>If you did not request this, please ignore this email.</p>
        <div class="footer">
          <p>&copy; 2025 E-Fashion. All rights reserved.</p>
        </div>
      </div>
    </body>
  </html>
  `;
  ;

  try {
    await mailUtil.sendingMail(foundUser.email, "Reset Password", mailContent);
    console.log("📩 Reset password email sent to:", foundUser.email);
    return res.json({ message: "Reset password link sent to mail." });
  } catch (error) {
    console.error("❌ Email sending failed:", error);
    return res.status(500).json({ message: "Error sending email." });
  }
};



const resetpassword = async (req, res) => {
  try {
    console.log("🔍 Received reset password request:", req.body);

    const { token, password } = req.body;
    if (!token || !password) {
      return res.status(400).json({ message: "Token and password are required" });
    }

    console.log("🔑 Verifying token:", token);
    const userFromToken = jwt.verify(token, secret);
    console.log("✅ Token decoded:", userFromToken);

    if (!userFromToken.id) {
      console.log("❌ Invalid token: Missing user ID.");
      return res.status(400).json({ message: "Invalid token" });
    }

    // Encrypt new password
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    console.log("🔄 Updating password for user:", userFromToken.id);
    const updatedUser = await userModel.findByIdAndUpdate(userFromToken.id, { password: hashedPassword });

    if (!updatedUser) {
      console.log("❌ User not found during password update.");
      return res.status(404).json({ message: "User not found" });
    }

    console.log("✅ Password updated successfully");
    res.json({ message: "Password updated successfully" });

  } catch (error) {
    console.error("❌ Reset password error:", error);
    res.status(500).json({ message: "Invalid or expired token" });
  }
};







module.exports = {
  signup,
  loginUser,
  getAllUser,
  getUserById,
  deleteUserById,
  userByName,
  getUserProfile,
  updateUserProfile,
  forgotPassword,
  resetpassword
};
