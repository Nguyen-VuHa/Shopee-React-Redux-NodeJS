const express = require('express');
const verifyToken = require('../middleware/verifyToken');
const router  = express.Router();

const categoryController = require('../controllers/categoryController');

router.get('/category' , categoryController.getAllCategory);
router.get('/category/slide' , categoryController.getSliderHomePage);
router.get('/category/list-name' , categoryController.getNameCategory);
router.get('/category/shop-all' , categoryController.getCategoryShopAll);
router.get('/category/:idCategory' , categoryController.getCategoryById);
router.get('/category-product/:idCategory' , categoryController.getCategoryProduct);
router.get('/category/delete/:idCategory', verifyToken , categoryController.deleteCategory);

router.post('/category/update-category', verifyToken , categoryController.updateCategory);
router.post('/category/new-category', verifyToken , categoryController.newCategory);

module.exports = router;