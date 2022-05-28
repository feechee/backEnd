const fs = require("fs");

class Productos {
  constructor(fileName) {
    this.fileName = fileName;
  }

  async getAll() {
    try {
      const contenido = await fs.promises.readFile(this.fileName, "utf-8");
      let object = JSON.parse(contenido);
      return object;
    } catch (err) {
      return console.log("Error de lectura", err);
    }
  }

  async getId(id) {
    let prodId = {};
    const productos = await this.getAll()
    productos.map((producto) => {
      if (producto.id == id) {
        prodId = producto;
      }
    });
    return prodId;
  }

 async postProducts(req) {
    const productos = await this.getAll()
    let newId = 0;
    if (productos.length == 0) {
      newId = 1;
    } else {
      newId = productos[productos.length - 1].id +1;
    }
    const fecha = Date.now()
    productos.push({ id: newId, timestamp: fecha, ...req.body });

    fs.writeFile(this.fileName, JSON.stringify(productos, null, 2), (err) => {
        if (err) {
          console.log("Error al crear el archivo", err);
        } else {
          console.log("El archivo se creo correctamente", productos);
        }
      });

    return productos;
  }

 async putPorducts(req) {
    const productos = await this.getAll()
    const { id } = req.params;
    const { nombre, descripcion, codigo, foto, precio, stock } = req.body;
    productos.map((producto) => {
      if (producto.id == id) {
        producto.nombre = nombre;
        producto.descripcion = descripcion;
        producto.codigo = codigo;
        producto.foto = foto;
        producto.precio = precio;
        producto.stock = stock;
      }
    });

    fs.writeFile(this.fileName, JSON.stringify(productos, null, 2), (err) => {
        if (err) {
          console.log("Error al crear el archivo", err);
        } else {
          console.log("El archivo se creo correctamente", productos);
        }
      });
    return productos;
  }

 async deleteProducts(req) {
    const productos = await this.getAll()
    const { id } = req.params;
    productos.map((producto, i) => {
      if (producto.id == id) {
        productos.splice(i, 1);
      }
    });
    fs.writeFile(this.fileName, JSON.stringify(productos, null, 2), (err) => {
        if (err) {
          console.log("Error al crear el archivo", err);
        } else {
          console.log("El archivo se creo correctamente", productos);
        }
      });

    return productos;
  }


  async errorMsg(foo, req) {
    const productos =await this.getAll()
    const { id } = req.params;
    const idExist = productos.find((producto) => producto.id == id);
    if (idExist) {
      return foo;
    } else {
      return { error: "producto no encontrado" };
    }
  }
}

module.exports = Productos;
