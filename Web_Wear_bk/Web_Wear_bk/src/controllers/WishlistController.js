const Wishlist = require("../models/WishlistModel");
const Bike = require("../models/ProductModel");


exports.addToWishlist = async (req, res) => {
    try {
        console.log("Request Body:", req.body); 

        const { userId, productId } = req.body;
        if (!userId || !productId) {
            return res.status(400).json({ error: "User ID and Product ID are required" });
        }

        const wishlistItem = new Wishlist({ userId, productId });
        await wishlistItem.save();

        console.log("Wishlist Item Saved:", wishlistItem); 
        res.status(201).json({ success: true, message: "Product added to wishlist", data: wishlistItem });
    } catch (error) {
        console.error("Error adding to wishlist:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};


exports.getWishlist = async (req, res) => {
    try {
        const { userId } = req.params;
        console.log("Fetching Wishlist for User ID:", userId);

        if (!userId) {
            console.error("User ID is missing");
            return res.status(400).json({ success: false, error: "User ID is required" });
        }

        const wishlist = await Wishlist.find({ userId }).populate("productId");

        console.log("Wishlist Data Found:", wishlist);

        if (wishlist.length === 0) {
            console.log("Wishlist is empty for this user.");
            return res.status(200).json({ success: true, data: [] });
        }

        res.status(200).json({ success: true, data: wishlist });
    } catch (error) {
        console.error("Error fetching wishlist:", error);
        res.status(500).json({ success: false, error: "Internal Server Error" });
    }
};


exports.removeFromWishlist = async (req, res) => {
    try {
        const { id } = req.params;

        console.log("Attempting to remove wishlist item with ID:", id);

        // Check if item exists
        const wishlistItem = await Wishlist.findById(id);
        if (!wishlistItem) {
            return res.status(404).json({ success: false, message: "Item not found in wishlist." });
        }

        // Delete item
        await Wishlist.findByIdAndDelete(id);
        console.log("Wishlist item removed successfully:", wishlistItem);

        res.json({ success: true, message: "Removed from wishlist" });
    } catch (error) {
        console.error("Error removing from wishlist:", error);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};