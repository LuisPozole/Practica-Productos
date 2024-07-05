const ConectarBD = require("./ConectarBD"); // Asegúrate de tener este módulo para la conexión a la base de datos

class ProductoBD extends ConectarBD {
    constructor() {
        super(); // Llama al constructor de la clase padre
    }

    async crearProducto(producto) {
        const sql = `INSERT INTO productos (nombre, descripcion, precio, imagen) 
                     VALUES (?, ?, ?, ?);`; // Parámetros para evitar inyección SQL
        try {
            await this.conectarMySql();
            await this.conexion.execute(sql, [producto.nombre, producto.descripcion, producto.precio, producto.imagen]); 
            await this.cerrarConexion();
            console.log("Producto creado correctamente");
        } catch (error) {
            console.error("Error al crear el producto: " + error);
            console.error(sql); 
        }
    }

    async mostrarProductos() {
        const sql = "SELECT * FROM productos";
        try {
            await this.conectarMySql();
            const productosBD = await this.conexion.execute(sql);
            await this.cerrarConexion();
            return productosBD;
        } catch (error) {
            console.error("Error al recuperar los productos: " + error);
            console.error(sql);
            return null;
        }
    }

    async buscarProductoPorId(idProducto) {
        const sql = "SELECT * FROM productos WHERE idproducto = ?"; 
        try {
            await this.conectarMySql();
            const producto = await this.conexion.execute(sql, [idProducto]); 
            await this.cerrarConexion();
            return producto;
        } catch (error) {
            console.error("Error al recuperar el producto: " + error);
            console.error(sql);
        }
    }

    async actualizarProducto(producto) {
        const sql = `UPDATE productos 
                     SET nombre = ?, descripcion = ?, precio = ?, imagen = ? 
                     WHERE idproducto = ?`;
        try {
            await this.conectarMySql();
            await this.conexion.execute(sql, [producto.nombre, producto.descripcion, producto.precio, producto.imagen, producto.idproducto]);
            await this.cerrarConexion();
            console.log("Actualización del producto correcta");
        } catch (error) {
            console.error("Error al editar el producto: " + error);
            console.error(sql);
        }
    }

    async borrarProducto(idproducto) {
        const sql = "DELETE FROM productos WHERE idproducto = ?"; 
        try {
            await this.conectarMySql();
            await this.conexion.execute(sql, [idproducto]); 
            await this.cerrarConexion();
            console.log("Producto borrado");
        } catch (error) {
            console.error("Error al borrar el producto: " + error);
            console.error(sql);
        }
    }
}

module.exports = ProductoBD; 
