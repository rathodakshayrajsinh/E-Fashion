const mongoose = require("mongoose");  // ✅ Import mongoose
const reviewModel = require("../models/ReviewsModel");  // ✅ Import Review model

// Create a Review
const createReview = async (req, res) => {
  try {
    let { productId, userId, rating, comment } = req.body;

    console.log("Received Data:", req.body);  // 🔹 Debugging Output

    // Check if all fields are provided
    if (!productId || !userId || !rating || !comment) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // ✅ Convert bikeId to MongoDB ObjectId if it's valid
    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({ message: "Invalid bikeId format", productId });
    }

   

    // Save review
    const newReview = new reviewModel({ productId, userId, rating, comment });
    await newReview.save();

    res.status(201).json({ message: "Review added successfully", review: newReview });
  } catch (error) {
    console.error("Error creating review:", error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};

const getAllReviews = async (req, res) => {
  try {
     const reviews = await reviewModel
       .find()
       .populate("productId userId");
     if (reviews.length === 0) {
       res.status(404).json({ message: "No review found" });
     } else {
       res.status(200).json({
         message: "review found successfully",
         data: reviews,
       });
     }
   } catch (err) {
     res.status(500).json({ message: err.message });
   }
 };


const getReviewsByBike = async (req, res) => {
  try {
     const review = await reviewModel
       .find({productId:req.params.productId})
       .populate("productId userId");
     if (review.length === 0) {
       res.status(404).json({ message: "No review found" });
     } else {
       res.status(200).json({
         message: "review found successfully",
         data: review,
       });
     }
   } catch (err) {
     res.status(500).json({ message: err.message });
   }
 };


const deleteReview = async (req, res) => {
  try {
    await reviewModel.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Review deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


module.exports={
    deleteReview,
    createReview,
    getAllReviews,
    getReviewsByBike
}