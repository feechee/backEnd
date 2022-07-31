import Productos from "../containers/productos.js";
import logger from "../utils/logger.js";
const productosCtrl = {};
const apiProductos	= new Productos()


productosCtrl.listar = async (req, res, next) => {
    try {
        logger.info('Petición en ruta /api/productos-test')
        res.send(await apiProductos.listarTodos());
    } catch (error) {
        logger.error(error)
        next(error);
    }
}

export default productosCtrl;