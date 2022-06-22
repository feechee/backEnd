import express from "express";
const app = express();


//Routes
import productosRoute from './routes/productosMD.js'
import carritoRoute from './routes/carritoFB.js'


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
