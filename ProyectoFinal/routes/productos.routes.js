import express from "express";
const router = express.Router();
const Productos = require("../productos");
let newProducto = new Productos("./productos.json");

//Variable de acceso de administrador
let admin = true;


router.get("/", async (req, res) => {
  res.send(await newProducto.getAll());
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  res.json(await newProducto.errorMsg(await newProducto.getId(id), req));
});

router.post("/", async (req, res) => {
  if (admin) {
    const data = await newProducto.postProducts(req);
    res.json(data);
  } else {
    res.send({ error: "No tiene permiso para ejecutar esta acción" });
  }
});

router.put("/:id", async (req, res) => {
  if (admin) {
    const data = await newProducto.putPorducts(req);
    res.json(data);
  } else {
    res.send({ error: "No tiene permiso para ejecutar esta acción" });
  }
});

router.delete("/:id", async (req, res) => {
  if (admin) {
    res.send(await newProducto.deleteProducts(req));
  } else {
    res.send({ error: "No tiene permiso para ejecutar esta acción" });
  }
});

module.exports = router

