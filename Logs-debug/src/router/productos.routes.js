import { Router } from 'express'
import productosCtrl from '../controllers/productos.controller.js';
const routerProductos = Router()

routerProductos.get('/api/productos-test', productosCtrl.listar )



export default routerProductos;