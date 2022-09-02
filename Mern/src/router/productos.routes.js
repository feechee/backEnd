import { Router } from 'express'
import productosCtrl from '../controllers/productos.controller.js';
import helpers from '../helpers/auth.js'

const isAuth = helpers.isAuthenticated
const routerProductos = Router()

routerProductos.get('/api/productos', isAuth, productosCtrl.listar )

routerProductos.get('/api/productos/:id', isAuth, productosCtrl.buscarId)

routerProductos.post('/api/productos', isAuth, productosCtrl.postProducto)

routerProductos.put('/api/productos/:id', isAuth, productosCtrl.editarProducto)

routerProductos.delete('/api/productos/:id', isAuth, productosCtrl.eliminarProducto)

export default routerProductos;