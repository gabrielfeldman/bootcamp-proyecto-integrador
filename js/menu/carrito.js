let mostrarCarrito = false;



async function renderTablaCarrito(carrito) {

    try {
        
        const elemSectionCarrito = document.getElementsByClassName('section-carrito')[0]
        const respuesta = await fetch('plantillas/carrito.hbs')
        const plantillaHbs = await respuesta.text()
        const template = Handlebars.compile(plantillaHbs)
        const html = template({ carrito } )
        //console.log(html)

        elemSectionCarrito.innerHTML = html
        elemSectionCarrito.classList.add('section-carrito--visible')  
        closeBtnCarrito(elemSectionCarrito);   
        window.addEventListener('scroll', disableScroll); 
        
    } catch (error) {
        console.error(error)
    }

}


function closeBtnCarrito(elemSectionCarrito) {
    const btn = document.createElement('button');
    btn.classList.add('btn--close');
    btn.innerHTML =  `<img src="img/icons/rectangle-xmark-regular.svg" alt="Close">`
    elemSectionCarrito.appendChild(btn);

    btn.addEventListener('click', () => {
        elemSectionCarrito.classList.remove('section-carrito--visible');
        mostrarCarrito = false;
    })
    

}

function disableScroll(){  
    if(mostrarCarrito) {
        window.scrollTo(0, 0);
    } else {
        window.removeEventListener('scroll', disableScroll); 
        
    }
   
  }
  

function initCarrito() {
    console.warn('initCarrito()')
    const btnCarrito = document.getElementsByClassName('search-bar__carrito-container')[0];
    const elemSectionCarrito = document.getElementsByClassName('section-carrito')[0];


    btnCarrito.addEventListener('click', async () => {
        mostrarCarrito = !mostrarCarrito;
        try {
            if(mostrarCarrito) {
                
                await renderTablaCarrito(carritoController.carrito);
    
            }else {
                elemSectionCarrito.classList.remove('section-carrito--visible');

            }

        } catch (error) {
            console.error(error)
        }


    })
}




initCarrito()
carritoController.contarProductosCarrito()
