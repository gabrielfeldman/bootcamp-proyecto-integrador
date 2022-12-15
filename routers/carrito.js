const express = require('express');
const routerCarrito = express.Router();

const controller = require('../controller/carrito');
const controllerP = require('../controller/pago');

/* Post - request para agregar un producto al carrito */

routerCarrito.post('/', controller.guardarCarrito )

routerCarrito.get('feedback', controllerP.feedBack)

module.exports = routerCarrito  