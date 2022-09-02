import * as models from "../models/productos.js";
import logger from "../utils/logger.js";

class ProductosMD {
  constructor() {}

  async getAll() {
    try {
      const contenido = await models.productos.find();
      return contenido;
    } catch (err) {
      return logger.error("Error de lectura", err);
    }
  }

  async getId(req) {
    try {
      const { id } = req.params;
      const contenido = await models.productos.findOne({ _id: id });
      return contenido;
    } catch (err) {
      return console.log("Error de lectura", err);
    }
  }

  async postProducts(req) {
    const prod = req.body;
    const productoCreado = await models.productos.create(prod);
    return productoCreado;
  }

  async putProducts(req) {
    const { id } = req.params;
    const usuariosActualizado = await models.productos.findOneAndUpdate(
      { _id: id },
      req.body
    );
    return usuariosActualizado;
  }

  async deleteProducts(req) {
    const { id } = req.params;
    const usuarioEliminado = await models.productos.findOneAndDelete({
      _id: id,
    });
    return usuarioEliminado;
  }
}

export default ProductosMD;
