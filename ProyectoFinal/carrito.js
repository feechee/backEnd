const fs = require("fs");

class Carrito {
  constructor(fileName) {
    this.fileName = fileName;
  }

  async getAll() {
    try {
      const contenido = await fs.promises.readFile(this.fileName, "utf-8");
      let object = await JSON.parse(contenido);
      return object
    } catch (err) {
      return console.log("Error de lectura", err);
    }
  }

  async postCarrito() {
    const carrito = await this.getAll();
    let newId = 0;
    if (carrito.length == 0) {
      newId = 1;
    } else {
      newId = carrito[carrito.length - 1].id + 1;
    }
    const fecha = Date.now();
    carrito.push({ id: newId, timestamp: fecha, productos: [] });

    fs.writeFile(this.fileName, JSON.stringify(carrito, null, 2), (err) => {
      if (err) {
        console.log("Error al crear el archivo", err);
      } else {
        console.log("El archivo se creo correctamente", carrito);
      }
    });

    return { id: newId };
  }

  async deleteCarrito(req) {
    const carrito = await this.getAll();
    const { id } = req.params;
    carrito.map((element, i) => {
      if (element.id == id) {
        carrito.splice(i, 1);
      }
    });
    fs.writeFile(this.fileName, JSON.stringify(carrito, null, 2), (err) => {
      if (err) {
        console.log("Error al crear el archivo", err);
      } else {
        console.log("El archivo se creo correctamente", carrito);
      }
    });

    return carrito;
  }

  async getId(id) {
    let carritoId = {};
    const carrito = await this.getAll();
    carrito.map((carrito) => {
      if (carrito.id == id) {
        carritoId = carrito;
      }
    });
    return carritoId;
  }

  async getIdProductos(id) {
    let carritoId = {};
    const carrito = await this.getAll();
    carrito.map((element) => {
      if (element.id == id) {
        carritoId = element.productos;
      }
    });
    return carritoId;
  }

  //Para crear un productos se debe enviar un objeto producto con el valor del ID del producto   ej: POST { "producto": 1 }
  async postProductos(id, req, prod) {
    const carrito = await this.getAll();
    const productos = await prod;
    let carrito_actual = {};
    console.log(req.body.producto);
    productos.map((element) => {
      if (element.id == req.body.producto) {
        carrito.map((e) => {
          if (e.id == id) {
            carrito_actual = e;
            e.productos.push({ ...element });
          }
        });
      }
    });

    fs.writeFile(this.fileName, JSON.stringify(carrito, null, 2), (err) => {
      if (err) {
        console.log("Error al crear el archivo", err);
      } else {
        console.log("El archivo se creo correctamente", carrito);
      }
    });

    return carrito_actual;
  }

  async deleteProductos(req) {
    const carrito = await this.getAll();
    let carrito_actual = {};
    const { id, id_prod } = req.params;
    carrito.map((element) => {
      if (element.id == id) {
        carrito_actual = element;
        element.productos.map((e, i) => {
          if (e.id == id_prod) {
            element.productos.splice(i, 1);
          }
        });
      }
    });

    fs.writeFile(this.fileName, JSON.stringify(carrito, null, 2), (err) => {
      if (err) {
        console.log("Error al crear el archivo", err);
      } else {
        console.log("El archivo se creo correctamente", carrito);
      }
    });

    return carrito_actual;
  }
}

module.exports = Carrito;
