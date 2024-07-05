const express = require("express");
const router = express.Router();
const Producto = require("../clases/ProductoClase");
const ProductoBD = require("../bd/ProductoBD");

// Mostrar todos los productos
router.get("/", async (req, res) => {
    try {
        const productoBD = new ProductoBD();
        const [productosBD] = await productoBD.mostrarProductos();

        const productosCorrectos = productosBD.filter(producto => producto.nombre && producto.precio);
        
        res.render("mostrarProducto", { productosCorrectos });
    } catch (error) {
        console.error("Error al recuperar los productos: ", error);
        res.render("error");
    }
});

// Mostrar formulario para agregar producto
router.get("/agregarProducto", (req, res) => {
    res.render("formularioProducto");
});

// Agregar nuevo producto
router.post("/agregarProducto", async (req, res) => {
    try {
        const producto = new Producto(req.body);
        const productoBD = new ProductoBD();
        await productoBD.crearProducto(producto.obtenerDatos());
        res.redirect("/productos");
    } catch (error) {
        console.error("Error al agregar producto: ", error);
        res.render("error");
    }
});

// Mostrar formulario para editar producto
router.get("/editarProducto/:id", async (req, res) => {
    try {
        const productoBD = new ProductoBD();
        const [[producto]] = await productoBD.buscarProductoPorId(req.params.id);
        res.render("editarProducto", producto);
    } catch (error) {
        console.error("Error al recuperar producto para editar: ", error);
        res.render("error");
    }
});

// Actualizar producto
router.post("/editarProducto/:id", async (req, res) => {
    try {
        const producto = new Producto(req.body);
        const productoBD = new ProductoBD();
        await productoBD.actualizarProducto(producto.obtenerDatos());
        res.redirect("/productos");
    } catch (error) {
        console.error("Error al actualizar producto: ", error);
        res.render("error");
    }
});

// Borrar producto
router.get("/borrarProducto/:id", async (req, res) => {
    try {
        const productoBD = new ProductoBD();
        await productoBD.borrarProducto(req.params.id);
        res.redirect("/productos");
    } catch (error) {
        console.error("Error al borrar producto: ", error);
        res.render("error");
    }
});

module.exports = router;
