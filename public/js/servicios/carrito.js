class CarritoService {
    //URL_CARRITO = 'https://633ccbddf2b0e623dc67cdb8.mockapi.io/carrito/'; 
    URL_CARRITO = '/api/carrito/'

    async guardarCarritoServicio(carrito) {
        const carritoGuardado = await http.post(this.URL_CARRITO, carrito);
        return carritoGuardado
    }
}

const carritoService = new CarritoService(); 