const express = require('express');
const routerProductos = express.Router();

const controlador = require('../controller/productos')

/* CRUD => CREATE / READ / UPDATE / DELETE */

/*GET ALL/ONE - request de todos los productos*/
routerProductos.get('/:id?', controlador.obtenerProductos)

/*POST (CREATE) - request para agregar un producto*/
routerProductos.post('/', controlador.guardarProducto)

/*PUT (UPDATE) - request para actualizar un producto*/
routerProductos.put('/:id', controlador.actualizarProducto)

/*DELETE (DELETE) - request para borrar un producto un producto*/
routerProductos.delete('/:id', controlador.borrarProducto)

module.exports = routerProductos;