const express = require('express');
// const verifyToken = require('../middleware/verifyToken');
const router  = express.Router();

const productController = require('../controllers/productController');

router.get('/product' , productController.getAllProduct);
router.get('/product-view' , productController.getAllProductView);
router.get('/product-detail' , productController.getProductDetail);
router.get('/search-product', productController.getProductByQuery);
router.get('/product/:idProduct' , productController.getProductById);

router.post('/product/new-product' , productController.postProduct);
router.post('/product/update-status' , productController.updateStatusProduct);
router.post('/product/update/:idProduct' , productController.postUpdateProduct);


module.exports = router;