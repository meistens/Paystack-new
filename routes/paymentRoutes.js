const express = require('express');
const router = express.Router();
const pay = require('../controllers/paymentController');

router.get('/', pay.getForm);
router.post('/paystack/pay', pay.postForm);
router.get('/paystack/callback', pay.callback);
// router.get('/receipt/:id', pay.receipt);
// router.get('/error', pay.error);

module.exports = router;