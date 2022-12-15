const ProductoModel = require("../model/productos");
const ProductoValidation = require("../utils/producto.validacion");

const model = ProductoModel.get(process.env.PERSISTENCIA || 'MONGODB') // FILE | MONGODB;

const obtenerProducto = async id => {
    const producto = await model.readProducto(id);
    return producto
}

const obtenerProductos = async () => {
    const productos = await model.readProductos();
    return productos
}

const guardarProducto = async (producto) => {

    const errorValidacion = ProductoValidation.validar(producto);
    
    // Si error validacion es false es porque está cargado correctamente
    if(!errorValidacion) {
        const productoGuardado = await model.createProducto(producto);
        return productoGuardado
    } else {
        console.log('Error en GuardarProducto', errorValidacion.details[0].message);
        return {}
    }
}

const borrarProducto = async id => {
    const productoEliminado = await model.deleteProducto(id);
    return productoEliminado
}

const actualizarProducto = async (id, producto) => {

        const errorValidacion = ProductoValidation.validar(producto);
    
    // Si error validacion es false es porque está cargado correctamente
    if(!errorValidacion) {
        const productoActualizado = await model.updateProducto(id, producto);
        return productoActualizado
    } else {
        console.log('Error en actualizarProducto', errorValidacion.details[0].message);
        return {}
    }

}

module.exports = {
    obtenerProducto,
    obtenerProductos,
    guardarProducto,
    borrarProducto,
    actualizarProducto
}