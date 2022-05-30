const express = require("express");
const { Server: HttpServer } = require("http");
const { Server: IOServer } = require("socket.io");
const Productos = require("./productos");
const Mensajes = require("./mensajes");
const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);
let newProducto = new Productos("./productos.json");
let newMensaje = new Mensajes("./mensajes.json");

const messages = [
  { author: "Juan", message: "Hola, como va?" },
  { author: "Pedro", message: "Todo bien, vos?" },
  { author: "Juan", message: "Que bueno!" },
];

app.use(express.static("./public"));

io.on("connection", async (socket) => {
  console.log("Cliente conectado");
  socket.emit("messages", await newMensaje.getAll());
  socket.on("new-message",async (data) => {
    await newMensaje.postMensajes(data)
    io.sockets.emit("messages",await newMensaje.getAll());
  });
  socket.emit("productos",await newProducto.getAll())
  socket.on("new-producto",async (data) => {
   await newProducto.postProducts(data);
    io.sockets.emit("productos",await newProducto.getAll());    
  });
});


const PORT = 8080;
httpServer.listen(PORT, () => {
  console.log("Servidor iniciado en el puerto:", PORT);
});
