const express = require("express");
const app = express();
const Productos = require("./productos");
const Carrito = require("./carrito");
let newProducto = new Productos("./productos.json");
let newCarrito = new Carrito("./carrito.json");
const { Router } = require("express");
const routerProductos = new Router();
const routerCarrito = new Router();
const productos = newProducto.getAll();
const carrito = newCarrito.getAll()
let admin = true;

//Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/api/productos", routerProductos);
app.use("/api/carrito", routerCarrito);
app.use(express.static("./public"));

//Routes Carrito

routerCarrito.get("/", async (req, res) => {
  res.send(await carrito);
});

routerCarrito.get("/:id", async (req, res) => {
    const { id } = req.params;
    res.send(await newCarrito.getId(id));
  });

routerCarrito.post("/", async (req, res) => {
  res.json(await newCarrito.postCarrito());
});

routerCarrito.delete("/:id", async (req, res) => {
  res.send(await newCarrito.deleteCarrito(req));
});

routerCarrito.get("/:id/productos", async (req, res) => {
    const { id } = req.params;
    res.json(await newCarrito.getIdProductos(id));
  });

  routerCarrito.post("/:id/productos", async (req, res) => {
    const { id } = req.params;
    res.json(await newCarrito.postProductos(id, req, productos));
  });

  routerCarrito.delete("/:id/productos/:id_prod", async (req, res) => {
    res.send(await newCarrito.deleteProductos(req));
  });





//Routes Productos
routerProductos.get("/", async (req, res) => {
  res.send(await productos);
});

routerProductos.get("/:id", async (req, res) => {
  const { id } = req.params;
  res.json(await newProducto.errorMsg(await newProducto.getId(id), req));
});

routerProductos.post("/", async (req, res) => {
  if (admin) {
    const data = await newProducto.postProducts(req);
    res.json(data);
  } else {
    res.send({ error: "No tiene permiso para ejecutar esta acción" });
  }
});

routerProductos.put("/:id", async (req, res) => {
  if (admin) {
    const data = await newProducto.putPorducts(req);
    res.json(data);
  } else {
    res.send({ error: "No tiene permiso para ejecutar esta acción" });
  }
});

routerProductos.delete("/:id", async (req, res) => {
  if (admin) {
    res.send(await newProducto.deleteProducts(req));
  } else {
    res.send({ error: "No tiene permiso para ejecutar esta acción" });
  }
});

//Start Server
const PORT = 8080;
const server = app.listen(PORT, () => {
  console.log("Servidor HTTP escuchando por el puerto:", PORT);
});

server.on("error", (error) => console.log("Error en servidor: ", error));
