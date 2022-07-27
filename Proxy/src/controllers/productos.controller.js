import Productos from "../containers/productos.js";
const productosCtrl = {};
const apiProductos	= new Productos()


productosCtrl.listar = async (req, res, next) => {
    try {
        res.send(await apiProductos.listarTodos());
    } catch (error) {
        next(error);
    }
}

export default productosCtrl;