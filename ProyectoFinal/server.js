import express from "express";
import path from 'path';
import * as url from 'url';
import connection from "./db/mongoDB.js";
import logger from "./utils/logger.js";
import './config/passport.js'
import exphbs from 'express-handlebars'
import MongoStore from 'connect-mongo'
import productosRoute from './routes/productosMD.routes.js'
import carritoRoute from './routes/carritoFB.routes.js'
import usuariosRoute from './routes/usuarios.routes.js'
import vistasRoute from './routes/vistas.routes.js'
import wappRoute from './routes/wapp.routes.js'
import session from 'express-session'
import passport from 'passport';
import flash from 'connect-flash';
import dotenv from 'dotenv'
import cookieParser from  'cookie-parser'



//Initializations
connection()
const app = express();
dotenv.config()
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));
const advancedOptions = {useNewUrlParser: true, useUnifiedTopology: true }


// Settings
app.set('views', path.join(__dirname, 'views'));
//Middlewares
app.use(express.json());
app.use(cookieParser())

app.engine('.hbs', exphbs.engine({
    defaultLayout:'main',
    layoutDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname:'.hbs'
}));
app.set('view engine', '.hbs');
app.use(express.urlencoded({extended:false}));
app.use(
  session({

    store: MongoStore.create({
        mongoUrl: process.env.MONGO_SESSION,
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

//Static files
app.use(express.static("./public"));

//Routes
app.use("/api/productos", productosRoute);
app.use("/api/carrito", carritoRoute);
app.use("/api/wapp", wappRoute);
app.use("/users", usuariosRoute);
app.use("/", vistasRoute)
app.all('*', (req, res) => {
  const { url, method } = req
  logger.warn(`Ruta ${method} ${url} no implementada`)
  res.send(`Ruta ${method} ${url} no implementada`)
})




//Start Server
const PORT = process.env.PORT || 8080;
const server = app.listen(PORT, () => {
  logger.info("Servidor HTTP escuchando por el puerto:", PORT);
});

server.on("error", (error) => logger.error("Error en servidor: ", error));
