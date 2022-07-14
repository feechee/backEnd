import express from 'express'
import path from 'path';
import * as url from 'url';
import './db/MDBconnection.js'
import './config/passport.js'
import exphbs from 'express-handlebars'
import routerVista from "./router/vistas.routes.js";
import routerProductos from './router/productos.routes.js';
import routerUsers from './router/users.routes.js';
import { createServer } from "http";
import { Server } from "socket.io";
import Mensajes from "./containers/mensajes.js"
import MongoStore from 'connect-mongo'
import session from 'express-session'
import passport from 'passport';
import flash from 'connect-flash';



//Initializations
const app = express();
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));
const httpServer = createServer(app);
const io = new Server(httpServer);
const advancedOptions = {useNewUrlParser: true, useUnifiedTopology: true }
//Settings
app.set('port', process.env.PORT || 8080);
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs.engine({
    defaultLayout:'main',
    layoutDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname:'.hbs'
}));
app.set('view engine', '.hbs');
//Middlewares
app.use(express.urlencoded({extended:false}));
app.use(
  session({

    store: MongoStore.create({
        mongoUrl:"mongodb+srv://coderhouse:coderhouse@cluster0.vdc3e6x.mongodb.net/sessions?retryWrites=true&w=majority",
        mongoOptions: advancedOptions,
        ttl: 10000,
    }),


    secret: 'coderhouse',
    resave: false,
    saveUninitialized: false,
  })
)
app.use(flash())
app.use(passport.initialize())
app.use(passport.session())

//Global Variables
app.use((req, res, next)=>{
 res.locals.usuario = req.flash('usuario')
  next()
})
const newMensaje = new Mensajes()

//Routes
app.use(routerVista);
app.use(routerProductos);
app.use(routerUsers)
//Static files
app.use(express.static(path.join(__dirname, 'public')))

io.on("connection", async (socket) => {
    console.log("Cliente conectado");
    socket.emit("messages", await newMensaje.getAll());
    socket.on("new-message",async (data) => {
      await newMensaje.insertarMensajes(data)
      io.sockets.emit("messages",await newMensaje.getAll());
    });
  });


export {app, io};