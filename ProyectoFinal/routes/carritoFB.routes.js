import express from "express";
const router = express.Router();
import CarritoFB from '../containers/carritoFB.js'
let newCarrito = new CarritoFB();
import ProductosMD  from '../containers/productosMD.js'
let newProducto = new ProductosMD();
const productos = newProducto.getAll();

router.get("/", async (req, res) => {
    res.send(await newCarrito.getAll());
  });
  
  router.get("/:id", async (req, res) => {
      const { id } = req.params;
      res.render('carrito', {id: await newCarrito.postCarrito()});
    });
  
    router.post("/", async (req, res) => {
      const id = await newCarrito.postCarrito()
      res.cookie("carrito", `${id}`)
      res.redirect('/')
  });
  
  router.delete("/:id", async (req, res) => {
    const { id } = req.params;
    res.send(await newCarrito.deleteCarrito(id));
  });
  
  router.get("/:id/productos", async (req, res) => {
      const { id } = req.params;
      const productos = await newCarrito.getIdProductos(id)
      const carrito = req.cookies.carrito
      res.render("carrito", {carrito: carrito, productos: productos});
    });
  
    router.post("/:id/productos/:id_prod", async (req, res) => {
      const { id, id_prod } = req.params;
      const producto = await newCarrito.postProductos(id, id_prod, productos)
      res.redirect('/')
    });
  
    router.delete("/:id/productos/:id_prod", async (req, res) => {
        const { id, id_prod } = req.params
      res.send(await newCarrito.deleteProductos(id, id_prod, productos));
    });
    

    export default router;