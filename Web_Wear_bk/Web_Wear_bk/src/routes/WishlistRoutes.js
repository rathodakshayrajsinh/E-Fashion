const routes = require('express').Router();;
const wishlistController = require("../controllers/WishlistController");

routes.post("/add", wishlistController.addToWishlist);
routes.get("/user/:userId", wishlistController.getWishlist);
routes.delete("/wishlist/:id", wishlistController.removeFromWishlist);


module.exports = routes;