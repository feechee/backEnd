const express = require("express");
const app = express();
const { Router } = require("express");
const router = Router();
const productos =[]
const Contenedor = require("./contenedor");
const handlebars = require('express-handlebars');
let compra = new Contenedor(productos);

//Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
/* app.use(express.static("./public")); */
app.use("/", router);
app.engine('handlebars', handlebars.engine())
app.set('views', './views')
app.set('view engine', 'handlebars')

//Routes
router.get("/", (req, res) => {
  res.render('form');
});

router.get("/productos", (req, res) => {
  res.render('productos', {productos: productos});
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  res.json(compra.errorMsg(compra.getId(id), req));
});

router.post("/productos", (req, res) => {
  compra.postProducts(req)
  res.render('productos', {productos: productos});
});

router.put("/:id", async (req, res) => {
  res.json(compra.errorMsg(compra.putPorducts(req), req));
});

router.delete("/:id", (req, res) => {
  res.send(compra.deleteProducts(req));
});

//Start Server
const PORT = 8080;
const server = app.listen(PORT, () => {
  console.log("Servidor HTTP escuchando por el puerto:", PORT);
});

server.on("error", (error) => console.log("Error en servidor: ", error));
