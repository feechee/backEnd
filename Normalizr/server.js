import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import ProductosRouter from "./router/productos.js";
import Mensajes from "./containers/mensajes.js"

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);

app.use(express.static("./public"));
app.use('/api/productos-test', new ProductosRouter());

let newMensaje = new Mensajes()

io.on("connection", async (socket) => {
  console.log("Cliente conectado");
  socket.emit("messages", await newMensaje.getAll());
  socket.on("new-message",async (data) => {
    await newMensaje.insertarMensajes(data)
    io.sockets.emit("messages",await newMensaje.getAll());
  });
});


const PORT = 8080;
httpServer.listen(PORT, () => {
  console.log("Servidor iniciado en el puerto:", PORT);
});
