const express = require('express');

// const routerProductos = require('./routers/productos');

// Configuraciones
const app = express()
require('dotenv').config()

// Middleware de aplicación
app.use(express.static('public'))
app.use(express.urlencoded({extended: true}));
app.use(express.json());

// Ruteo de mi aplicación
app.use('/api/productos', require('./routers/productos'))
app.use('/api/carrito', require('./routers/carrito'))
app.use('/api/upload', require('./routers/upload'))

/*app.get('/', (req, res)=> {
    res.send('Hello world')
})*/

const PORT = process.env.PORT
app.listen(PORT, (err)  => {
    if ( err ) throw new Error(`Error ${err}`)
    console.log(`App listenig on port: ${PORT}`)
})