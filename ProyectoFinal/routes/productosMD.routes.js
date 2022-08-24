import express from "express";
import ProductosMD from '../containers/productosMD.js'
import connection from "../db/mongoDB.js";

connection()
const router = express.Router();

const data = new ProductosMD();
const allProd = await data.getAll()
const productos =[]



//Variable de acceso de administrador
let admin = true;

router.get("/", async (req, res) => {
  allProd.map((prod)=>{
    productos.push({nombre: prod.nombre, precio: prod.precio, foto: prod.foto})
  })
  res.render("productos", {productos: productos });
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