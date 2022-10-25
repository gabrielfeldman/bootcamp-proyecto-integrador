class ProductoService {
    URL_PRODUCTOS = 'https://633ccbddf2b0e623dc67cdb8.mockapi.io/productos/';

    async obtenerProductosService() {
        let productos = await http.get(this.URL_PRODUCTOS);
        console.log(productos);
        return productos
    }
    
    async guardarProductosService(producto) {
        const productoGuardado = await http.post(this.URL_PRODUCTOS, producto);
        //console.log(productoGuardado)
        return productoGuardado
    }
    
    
    async actualizarProductosService(id, producto) {
        const productoActualizado = await http.put(this.URL_PRODUCTOS, id, producto);
        //console.log(productoActualizado)
        return productoActualizado
    
    }
    
    
    async borrarProductosService(id) {
        const productoBorrado = await http.del(this.URL_PRODUCTOS, id);
            //console.log(productoBorrado)
            return productoBorrado
    
    }
    
}

const productoService = new ProductoService()

