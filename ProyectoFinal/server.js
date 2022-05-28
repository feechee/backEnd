const express = require("express");
const app = express();


//Routes
const carritoRoute = require("./routes/carrito");
const productosRoute = require("./routes/productos");

//Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/api/productos", productosRoute);
app.use("/api/carrito", carritoRoute);
app.use(express.static("./public"));

//Start Server
const PORT = process.env.PORT || 8080;
const server = app.listen(PORT, () => {
  console.log("Servidor HTTP escuchando por el puerto:", PORT);
});

server.on("error", (error) => console.log("Error en servidor: ", error));
