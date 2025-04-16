const routes = require('express').Router();
const productController = require('../controllers/ProductControllers');


routes.post('/addProduct', productController.addProduct);
routes.get('/getAllProduct', productController.getAllProduct);
routes.post('/addProductWithFile', productController.addProductWithFile);
routes.get('/getAllProductByUserId/:userId', productController.getAllProductByUserId)
routes.get("/getProductById/:id", productController.getProductById);


module.exports = routes;