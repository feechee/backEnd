const express = require("express");
const app = express();
const { Router } = require("express");
const router = Router();
const productos =[]
const Contenedor = require("./contenedor.js");
let compra = new Contenedor(productos);

//Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/", router);
app.set('view engine', 'ejs')

//Routes
router.get("/", (req, res) => {
  res.render('form');
});

router.get("/productos", (req, res) => {
  res.render('productos', {productos: productos});
});

router.post("/productos", (req, res) => {
  compra.postProducts(req)
  res.render('productos', {productos: productos});
});


//Start Server
const PORT = 8080;
const server = app.listen(PORT, () => {
  console.log("Servidor HTTP escuchando por el puerto:", PORT);
});

server.on("error", (error) => console.log("Error en servidor: ", error));
