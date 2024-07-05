const ConectarBD = require("../bd/ConectarBD"); // Corrección en la ruta de importación

class Producto extends ConectarBD { // Heredar de ConectarBD para acceder a la base de datos
    constructor(producto) {
        super(); // Llama al constructor de la clase padre
        this.id = producto.idproducto;
        this.nombre = producto.nombre;
        this.descripcion = producto.descripcion;
        this.precio = producto.precio;
        
    }

    // ... (métodos get y set para validar los datos del producto)

    get obtenerDatos() {
        return {
            idproducto: this.id,
            nombre: this.nombre,
            descripcion: this.descripcion,
            precio: this.precio,
            imagen: this.imagen
        };
    }
}

module.exports = Producto;
