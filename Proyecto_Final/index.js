const express = require("express");
const app = express();
const { Router } = require("express");
const productos = [];
const carrito = [];
const Productos = require("./productos.js");
const Carrito = require("./carrito.js")
const routerProductos = new Router();
const routerCarrito = new Router();
let product = new Productos(productos);
let chart = new Carrito(carrito)


//Middlewares
routerProductos.use(express.json());
routerCarrito.use(express.json());

app.use("/productos", routerProductos);
app.use("/carrito", routerCarrito);

//Routes Productos
routerProductos.get("/", (req, res) => {
  res.send(productos);
});

routerProductos.get("/:id", (req, res) => {
  const { id } = req.params;
  res.json(product.errorMsg(product.getId(id), req));
});

routerProductos.post("/", (req, res) => {
  res.json(product.postProducts(req));
});

routerProductos.put("/:id", async (req, res) => {
  res.json(product.errorMsg(product.putPorducts(req), req));
});

routerProductos.delete("/:id", (req, res) => {
  res.send(product.deleteProducts(req));
});

//Routes Carrito
routerCarrito.get("/", (req, res) => {
  res.send(productos);
});

routerCarrito.get("/:id", (req, res) => {
  const { id } = req.params;
  res.json(chart.errorMsg(chart.getId(id), req));
});

routerCarrito.post("/", (req, res) => {
  res.json(chart.postProducts(req));
});

routerCarrito.put("/:id", async (req, res) => {
  res.json(chart.errorMsg(chart.putPorducts(req), req));
});

routerCarrito.delete("/:id", (req, res) => {
  res.send(chart.deleteProducts(req));
});


//Start Server
const PORT = 8080;
const server = app.listen(PORT, () => {
  console.log("Servidor HTTP escuchando por el puerto:", PORT);
});

server.on("error", (error) => console.log("Error en servidor: ", error));
