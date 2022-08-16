import express from 'express';
import Productos from '../containers/productos.js';

class ProductosRouter extends express.Router {
    constructor() {
        super()

        const apiProductos = new Productos();

        this.get('/index', async (req, res, next) => {
            try {
                res.json(await apiProductos.listarTodos());
            } catch (error) {
                next(error);
            }
        })

    }
}

export default ProductosRouter;