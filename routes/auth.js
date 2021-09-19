const express = require('express');
const router  = express.Router();

const authController = require('../controllers/authController');

router.post('/register', authController.registerPost);
router.post('/login', authController.loginPost);
router.post('/refresh-token', authController.refreshToken);

module.exports = router;