const express = require('express');
const verifyToken = require('../middleware/verifyToken');
const router  = express.Router();

const messageController = require('../controllers/messageController');

router.get('/get-message/:senderId/:receiverId', verifyToken , messageController.getMessageRoom);
router.get('/get-id-admin', messageController.getIdAdmin);

router.post('/create-message', verifyToken , messageController.createMessage);

module.exports = router;