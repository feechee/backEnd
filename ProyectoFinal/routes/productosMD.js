import express from "express";
const router = express.Router();
import ProductosMD from '../containers/productosMD.js'
let newProducto = new ProductosMD();

//Variable de acceso de administrador
let admin = true;


router.get("/", async (req, res) => {
  res.send(await newProducto.getAll());
});

router.get("/:id", async (req, res) => {
  res.json(await newProducto.getId(req));
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
    const data = await newProducto.putProducts(req);
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

export default router