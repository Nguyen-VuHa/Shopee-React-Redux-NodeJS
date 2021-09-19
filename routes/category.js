const express = require('express');
// const verifyToken = require('../middleware/verifyToken');
const router  = express.Router();

const categoryController = require('../controllers/categoryController');


router.get('/category' , categoryController.getCategory);
router.get('/category/shop-all' , categoryController.getCategoryShopAll);
router.get('/category/:idCategory' , categoryController.getCategoryById);
router.get('/category-product/:idCategory' , categoryController.getCategoryProduct);

router.post('/category/delete/:idCategory' , categoryController.deleteCategory);
router.post('/category/update-category' , categoryController.updateCategory);
router.post('/category/new-category' , categoryController.newCategory);

module.exports = router;