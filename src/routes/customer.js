const express = require('express');
const router = express.Router();
const controller = require('../controllers/appController');

router.get('/', controller.login);
router.post('/add_transaccion', controller.addTransaccion);
router.get('/consultar_saldo', controller.consultar);


module.exports = router; 