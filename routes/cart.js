const express = require('express');
const verifyToken = require('../middleware/verifyToken');
const router  = express.Router();

const cartsController = require('../controllers/cartController');

router.get('/carts' , verifyToken, cartsController.getCarts);
router.get('/carts/plus/:idCarts' , verifyToken, cartsController.plusCart);
router.get('/carts/minus/:idCarts' , verifyToken, cartsController.minusCart);
router.get('/carts/remove/:idCarts' , verifyToken, cartsController.removeCarts);

module.exports = router;