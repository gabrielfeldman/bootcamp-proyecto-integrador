const ProductoModelFile = require('./productosFile')
const ProductoModelMongoDB = require('./productosMongoDB')

class ProductoModel {
    static get(tipo) {
        switch (tipo) {
            case 'MONGODB': 
                console.log('**** PERSISTENCIA EN MONGO DB (productos) ****')   
                const mongodb = new ProductoModelMongoDB()
                mongodb.conectarDB()
                return mongodb  

            case 'FILE': 
                console.log('**** PERSISTENCIA EN FILESYSTEM (productos) ****') 
                const file = new ProductoModelFile() 
                return file 
           
            default:
                console.log('No paso ningún tipo')
                break;
        }
    }
}

module.exports = ProductoModel