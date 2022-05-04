const fs = require("fs");

class Contenedor {
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

  async save(object) {
    let prod = await this.getAll();
    let newId = 1;
    if (prod.length > 0) {
      newId = prod[prod.length - 1].id + 1;
    }
    const newObjct = { id: newId, ...object };
    prod.push(newObjct);

    fs.writeFile(this.fileName, JSON.stringify(prod, null, 2), (err) => {
      if (err) {
        console.log("Error al crear el archivo", err);
      } else {
        console.log("El archivo se creo correctamente");
      }
    });
  }

  deleteAll(){
    const clean = []
    fs.writeFile(this.fileName, JSON.stringify(clean, null, 2), (err) => {
        if (err) {
          console.log("Error al borrar los productos", err);
        } else {
          console.log("Los productos se borraron correctamente");
        }
      });
}

async getById(numId){
    try {
        const products = await this.getAll()
        const result = await products.find(num => num.id === numId);
        if (result) {
            console.log(`el producto es ${result.title}`);
        } else {
            console.log(null);
            return null
        }
    } catch (err) {
        console.log(err);
    }       
}

async deleteById(numId){
  try {
    const products = await this.getAll()
    const newProd = await products.filter(num => num.id != numId)
    
    fs.promises.writeFile(this.fileName, JSON.stringify(newProd, null, 2))
    if (newProd.length == products.length) {
        console.log("el Id no corresponde a un producto válido");
        
    } else {
        console.log("se borro el producto correctamente");
    }
    
  } catch (err) {
    console.log("no se pudo eliminar el producto", err);
  }
}
}

module.exports = Contenedor;