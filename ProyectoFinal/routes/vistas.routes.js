import logger from "../utils/logger.js";
import express from "express";
import helpers from '../helpers/auth.js'
import ProductosMD from "../containers/productosMD.js";

const data = new ProductosMD
const allProd = await data.getAll()
const productos =[]
const router = express.Router();
const checkAuth = helpers.checkAuth
let carrito = "N/D"

router.get("/",checkAuth, (req, res) =>{
    logger.info('Petición en ruta /')
    if (req.cookies.carrito) {
      console.log(req.cookies.carrito);
      carrito = req.cookies.carrito
    }
    if(req.isAuthenticated){
      allProd.map((prod)=>{
        productos.push({carrito: carrito, id: prod._id.toString() ,nombre: prod.nombre, precio: prod.precio, foto: prod.foto})
      })
      console.log(productos);
        logger.info('Petición en ruta /')
        res.render('index', {carrito: carrito, user: req.user.email, productos: productos})
      } else {
        res.render('users/signin')
      }
})

export default router;