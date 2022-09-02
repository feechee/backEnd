import { Router } from 'express'
import carritoCtrl from '../controllers/carrito.controller.js';
import helpers from '../helpers/auth.js'

const isAuth = helpers.isAuthenticated
const routerCarrito = Router()

routerCarrito.get('/api/carrito',isAuth,  carritoCtrl.listar )

routerCarrito.get('/api/carrito/:id', isAuth,  carritoCtrl.buscarId)

routerCarrito.post('/api/carrito', isAuth,  carritoCtrl.crear)

routerCarrito.delete('/api/carrito/:id', isAuth,  carritoCtrl.eliminar)

routerCarrito.get('/api/carrito/:id/productos', isAuth,  carritoCtrl.listarProductos)

routerCarrito.post('/api/carrito/:id/productos/:id_prod', isAuth,  carritoCtrl.agregarProducto)

routerCarrito.delete('/api/carrito/:id/productos/:id_prod',isAuth,  carritoCtrl.eliminarProducto)

export default routerCarrito;