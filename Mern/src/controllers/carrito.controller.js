import carritoFB from "../containers/carritoFB.js";
import logger from "../utils/logger.js";
import ProductosMD  from '../containers/productosMD.js'
import connection from   '../db/MDBconnection.js'
import CarritoFB from '../containers/carritoFB.js'



connection()
let newProducto = new ProductosMD();
const apiCarrito = new carritoFB()

const productos = await newProducto.getAll();
const carritoCtrl = {};




carritoCtrl.listar = async (req, res, next) => {
    try {
        logger.info('Petición en ruta /api/carrito')
        res.send(await apiCarrito.getAll());
    } catch (error) {
        logger.error(error)
        next(error);
    }
}

carritoCtrl.crear = async (req, res, next) =>{
    try {
        logger.info('Petición en ruta /api/carrito')
        res.send(await apiCarrito.postCarrito());
    } catch (error) {
        logger.error(error)
        next(error);
    }
}

carritoCtrl.eliminar = async (req, res, next) =>{
    try {
        const { id } = req.params;
        logger.info('Petición en ruta /api/carrito/:id')
        res.send(await apiCarrito.deleteCarrito(id));
    } catch (error) {
        logger.error(error)
        next(error);
    }
}

carritoCtrl.buscarId = async (req, res, next) =>{
    try {
        const { id } = req.params;
        logger.info('Petición en ruta /api/carrito/:id')
        res.send(await apiCarrito.getId(id));
    } catch (error) {
        logger.error(error)
        next(error);
    }
}

carritoCtrl.listarProductos = async (req, res, next) =>{
    try {
        const { id } = req.params;
        const productos = await apiCarrito.getIdProductos(id)
        const carrito = id
        res.send({ carrito: carrito, productos: '1' });
    } catch (error) {
        logger.error(error)
        next(error);
    }
}

carritoCtrl.agregarProducto = async (req, res, next) =>{
    try {
        const { id, id_prod } = req.params;
        res.send(await apiCarrito.postProductos(id, id_prod, productos))
    } catch (error) {
        logger.error(error)
        next(error);
    }

}

carritoCtrl.eliminarProducto = async (req, res, next) =>{
    try {
        const { id, id_prod } = req.params
        res.send(await apiCarrito.deleteProductos(id, id_prod, productos));
    } catch (error) {
            logger.error(error)
            next(error);
    }
}



export default carritoCtrl;