class CarritoController extends CarritoModel {

    constructor() {
        super()

        try {
            
            this.carrito = JSON.parse(localStorage.getItem('carrito')) || []; 

        } catch (error) {
            
            console.error('Algo ocurrió con la lectura del localStorage', error);
            this.carrito = [];
            localStorage.setItem('carrito', this.carrito);
        }

    }

    elProductoEstaEnElCarrito(producto) {
        return this.carrito.filter(prod => prod.id == producto.id).length
    }

    obtenerProductoDeCarrito(producto) {
        return this.carrito.find(prod => prod.id == producto.id)
    }

    agregarAlCarrito(producto) {
        //console.log(producto)

 


        if(!this.elProductoEstaEnElCarrito(producto)) {
            producto.cantidad = 1
            this.carrito.push(producto);
        } else {
            const productoDeCarrito = this.obtenerProductoDeCarrito(producto)
            productoDeCarrito.cantidad++;
            
        }

        localStorage.setItem('carrito', JSON.stringify(this.carrito))
        this.contarProductosCarrito()
        
    }




    async borrarProductoCarrito(id) {

        try {
            const index = this.carrito.findIndex(prod => prod.id == id); 
            this.carrito.splice(index, 1);
            localStorage.setItem('carrito', JSON.stringify(this.carrito));
            carritoController.contarProductosCarrito()
    
            await renderTablaCarrito(this.carrito)
        } catch (error) {
            console.log(error)
        }

    }

    async enviarCarrito() {
        try { 
            const elemSectionCarrito = document.getElementsByClassName('section-carrito')[0];
            
            elemSectionCarrito.innerHTML = '<h2 class="section-carrito__placeholder-title">Enviando carrito...</h2>';
            const preference = await carritoService.guardarCarritoServicio(this.carrito)
            this.carrito = [];
            localStorage.setItem('carrito', JSON.stringify(this.carrito));          
            /*elemSectionCarrito.innerHTML = `<h2 class="section-carrito__placeholder-title">Tu compra fue realizada con éxito</h2>
            <div class="section-carrito__submit-confirmation-img-container"></div>`;*/
            elemSectionCarrito.innerHTML = '<h2>Redirigir a medio de pago</h2>'

            setTimeout( async () => {
                elemSectionCarrito.classList.remove('section-carrito--visible')
                /* mostraCarrito = false */
                console.log(preference)
                await renderPago(preference)
            }, 0)

            this.closeBtnCarrito(elemSectionCarrito); 
            
            this.resetearCuentaProductosCarrito(this.carrito);      
            
            
        } catch (error) {
            console.error(error);
        }


    }


    closeBtnCarrito(elemSectionCarrito) {
        const btn = document.createElement('button');
        btn.classList.add('btn--close');
        //btn.innerHTML =  `<img src="img/icons/rectangle-xmark-regular.svg" alt="Close">`
        btn.textContent =  `Cerrar carrito`
        elemSectionCarrito.appendChild(btn);
            
        btn.addEventListener('click', () => {
            elemSectionCarrito.classList.remove('section-carrito--visible');
            mostrarCarrito = false;
        })
        
    
    }

    contarProductosCarrito() {
        const carritoContainer = document.querySelector('.search-bar__carrito-container');
        const carritoSum = document.createElement('div');
        carritoSum.classList.add('search-bar__carrito-container__sum');


        let carrito = this.carrito;
        let cantidadTotalEnCarrito = 0;
        
        carrito.forEach(producto => {
            cantidadTotalEnCarrito = cantidadTotalEnCarrito+producto.cantidad; 
        });
        
        carritoSum.innerHTML = cantidadTotalEnCarrito;
        carritoContainer.appendChild(carritoSum);
        
  
    }



    resetearCuentaProductosCarrito(carrito) {
        const carritoContainer = document.querySelector('.search-bar__carrito-container');
        const carritoSum = carritoContainer.querySelector('.search-bar__carrito-container__sum');        
        carritoSum.innerHTML = carrito.length;
        carritoContainer.appendChild(carritoSum);
    }


}

const carritoController = new CarritoController()