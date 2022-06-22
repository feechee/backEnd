import mongoose from "mongoose";
import * as models from "../models/productos.js";

//---------------------------------------------------------------------------------------------------------------------
//Conexion a base de datos MongoDB
async function conection() {
  try {
    const URL =
      "mongodb+srv://coderhouse:coderhouse@cluster0.vdc3e6x.mongodb.net/?retryWrites=true&w=majority";

    let conexion = await mongoose.connect(URL);

    console.log("coneccion a mongodb correcta");
  } catch (err) {
    console.log("error: ", err);
  }
}
conection();

//--------------------------------------------------------------------------------------------------------------------------

class ProductosMD {
  constructor() {}

  async getAll() {
    try {
      const contenido = await models.productos.find();
      return contenido;
    } catch (err) {
      return console.log("Error de lectura", err);
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
