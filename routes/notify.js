const express = require('express');
const verifyToken = require('../middleware/verifyToken');
const router  = express.Router();

const notifyController = require('../controllers/notifyController');

router.get('/notify', verifyToken ,notifyController.getNotify);
router.get('/count-notify', verifyToken ,notifyController.getCount);
router.post('/update', verifyToken ,notifyController.postUpdate);

module.exports = router;