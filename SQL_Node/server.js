import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import  options  from "./options/connection.js";
import Productos from "./productos.js";
import Mensajes from "./mensajes.js"

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);

app.use(express.static("./public"));

let newProducto = new Productos(options.sqlDb);
let newMensaje = new Mensajes(options.sqlite3)

newMensaje.crearTabla()
io.on("connection", async (socket) => {
  console.log("Cliente conectado");
  socket.emit("productos",await newProducto.listarProductos() )
  socket.on("new-producto",async (data) => {
   await newProducto.insertarProductos(data);
    io.sockets.emit("productos",await newProducto.listarProductos());    
  });
  socket.emit("messages", await newMensaje.listarMensajes());
  socket.on("new-message",async (data) => {
    await newMensaje.insertarMensajes(data)
    io.sockets.emit("messages",await newMensaje.listarMensajes());
  });
});

const PORT = 8080;
httpServer.listen(PORT, () => {
  console.log("Servidor iniciado en el puerto:", PORT);
});
