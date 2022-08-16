import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import ProductosRouter from "./router/productos.js";
import Mensajes from "./containers/mensajes.js"
import VistasRouter from "./router/vistas.js";
import handlebars, { engine } from 'express-handlebars'
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import session from 'express-session'
import MongoStore from 'connect-mongo'


const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);
const __dirname = dirname(fileURLToPath(import.meta.url));
const advancedOptions = {useNewUrlParser: true, useUnifiedTopology: true } 
let newMensaje = new Mensajes()


app.use(express.json())
app.use(express.static("public"));
app.set('view engine', 'handlebars');
app.use(express.urlencoded({ extended: true }))
app.use('/api/productos-test', new ProductosRouter());
app.engine('handlebars', engine({
  layoutsDir: __dirname + '/views/layouts', defaultLayout: __dirname + '/views', partialsDir: __dirname + '/views/partials'
  }));
app.use(
    session({
  
      store: MongoStore.create({
          mongoUrl:"mongodb+srv://coderhouse:coderhouse@cluster0.vdc3e6x.mongodb.net/sessions?retryWrites=true&w=majority",
          mongoOptions: advancedOptions,
          ttl: 600,
      }),
  
  
      secret: 'coderhouse',
      resave: false,
      saveUninitialized: false,
    })
  )
app.use('/', new VistasRouter());




io.on("connection", async (socket) => {
  console.log("Cliente conectado");
  socket.emit("messages", await newMensaje.getAll());
  socket.on("new-message",async (data) => {
    await newMensaje.insertarMensajes(data)
    io.sockets.emit("messages",await newMensaje.getAll());
  });
});


const PORT = process.env.PORT || 8080
httpServer.listen(PORT, () => {
  console.log("Servidor iniciado en el puerto:", PORT);
});
