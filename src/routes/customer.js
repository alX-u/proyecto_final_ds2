const express = require('express');
const router = express.Router();
const controller = require('../controllers/customerController');

router.get('/', controller.getForm);
router.post('/add_transaccion', controller.addTransaccion);
router.get('/success_payment', controller.success);

module.exports = router; 