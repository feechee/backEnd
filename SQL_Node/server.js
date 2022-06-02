const express = require("express");
const { Server: HttpServer } = require("http");
const { Server: IOServer } = require("socket.io");
const { options } = require("./options/mysqlconn.js");
const Productos = require("./productos.js");
/* const Mensajes = require("./mensajes"); */
const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);
/* let newMensaje = new Mensajes("./mensajes.json"); */

const newProducto = new Productos(options);

try {async ()=>{
  await newProducto.crearTabla();

  const productos = [
    {
      title: "caja",
      price: 50,
      thumbnail: "foto",
    },
  ];
  await newProducto.insertarProductos(productos);

  const articulosLeidos = await newProducto.listarProductos();
  console.table(articulosLeidos);
}

} catch (err) {
  console.log(err);
} finally {
  newProducto.close();
}

/* app.use(express.static("./public"));

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
}); */
