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
      res.send(await newCarrito.getId(id));
    });
  
    router.post("/", async (req, res) => {
    res.json(await newCarrito.postCarrito());
  });
  
  router.delete("/:id", async (req, res) => {
    const { id } = req.params;
    res.send(await newCarrito.deleteCarrito(id));
  });
  
  router.get("/:id/productos", async (req, res) => {
      const { id } = req.params;
      res.json(await newCarrito.getIdProductos(id));
    });
  
    router.post("/:id/productos/:id_prod", async (req, res) => {
      const { id, id_prod } = req.params;
      res.json(await newCarrito.postProductos(id, id_prod, productos));
    });
  
    router.delete("/:id/productos/:id_prod", async (req, res) => {
        const { id, id_prod } = req.params
      res.send(await newCarrito.deleteProductos(id, id_prod, productos));
    });
    

    export default router;