import ProductosMD from "../containers/productosMD.js";
import logger from "../utils/logger.js";
const productosCtrl = {};
const apiProductos	= new ProductosMD()


productosCtrl.listar = async (req, res, next) => {
    try {
        logger.info('Petición en ruta /api/productos')
        res.send(await apiProductos.getAll());
    } catch (error) {
        logger.error(error)
        next(error);
    }
}

productosCtrl.buscarId = async (req, res, next) =>{
    try {
        logger.info('Petición en ruta /api/productos/:id')
        res.send(await apiProductos.getId(req));
    } catch (error) {
        logger.error(error)
        next(error);
    }
}

productosCtrl.postProducto = async (req, res, next) =>{
    try {
        logger.info('Petición en ruta /api/productos')
        res.send(await apiProductos.postProducts(req));
    } catch (error) {
        logger.error(error)
        next(error);
    }
}

productosCtrl.editarProducto = async (req, res, next) =>{
    try {
        logger.info('Petición en ruta /api/productos/:id')
        res.send(await apiProductos.putPorducts(req));
    } catch (error) {
        logger.error(error)
        next(error);
    }
}

productosCtrl.eliminarProducto = async (req, res, next) =>{
    try {
        logger.info('Petición en ruta /api/productos/:id')
        res.send(await apiProductos.deleteProducts(req));
    } catch (error) {
        logger.error(error)
        next(error);
    }
}

export default productosCtrl;