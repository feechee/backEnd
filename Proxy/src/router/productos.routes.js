import { Router } from 'express'
import productosCtrl from '../controllers/productos.controller.js';
import compression from 'compression'

const routerProductos = Router()

routerProductos.get('/api/productos-test',compression() , productosCtrl.listar )



export default routerProductos;