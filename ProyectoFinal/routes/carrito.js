const express = require("express");
const router = express.Router();
const Carrito = require("../carrito");
let newCarrito = new Carrito("./carrito.json");
const Productos = require("../productos");
let newProducto = new Productos("./productos.json");
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
    res.send(await newCarrito.deleteCarrito(req));
  });
  
  router.get("/:id/productos", async (req, res) => {
      const { id } = req.params;
      res.json(await newCarrito.getIdProductos(id));
    });
  
    router.post("/:id/productos", async (req, res) => {
      const { id } = req.params;
      res.json(await newCarrito.postProductos(id, req, productos));
    });
  
    router.delete("/:id/productos/:id_prod", async (req, res) => {
      res.send(await newCarrito.deleteProductos(req));
    });
    module.exports = router