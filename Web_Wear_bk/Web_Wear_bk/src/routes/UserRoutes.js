const express = require("express");
const routes = express.Router();
const userController = require("../controllers/UserController");

// User Authentication Routes
routes.post("/signup", userController.signup);
routes.post("/login", userController.loginUser);
routes.get("/allUser", userController.getAllUser);
routes.get("/user/:id", userController.getUserById);
routes.delete("/user/:id", userController.deleteUserById);
routes.get("firstName/:firstName", userController.userByName);
routes.get("/userprofile/:userId", userController.getUserProfile);
routes.put("/profile/:userId", userController.updateUserProfile);
routes.post("/forgotpassword",userController.forgotPassword);
routes.post("/resetpassword",userController.resetpassword)


module.exports = routes;