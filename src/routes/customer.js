const express = require('express');
const router = express.Router();
const controller = require('../controllers/customerController');

router.get('/', controller.login);
router.post('/add_transaccion', controller.addTransaccion);


module.exports = router; 