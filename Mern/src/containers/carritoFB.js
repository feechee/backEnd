import query from "../db/firebaseDB.js";

class CarritoFB {
  constructor() {}

  async getAll() {
    try {
        const datos = []
      const contenido = await query.get();
      contenido.forEach(doc =>{
          datos.push(doc.data())
      })
      return datos
    } catch (err) {
      return console.log("Error de lectura", err);
    }
  }

  async postCarrito() {
    const fecha = Date.now();
    try {
      const contenido = await query.add({ timestamp: fecha, productos: [] });
      return contenido.id;
    } catch (err) {
      return console.log("Error de escritura", err);
    }
  }

  async deleteCarrito(id) {
    const contenido = await query.doc(id).delete();
    return this.getAll()
  }

  async getId(id) {
    const contenido = await query.doc(id).get();
    return contenido.data();
  }

  async postProductos(id, id_prod, prod) {

    const carrito = await this.getId(id);
    console.log(carrito);
    const productos = await prod;
    productos.map(async (element) => {
      if (element.id == id_prod) {
          const { _id, nombre, descripcion, codigo, foto, precio, stock } = element
          const id_j = JSON.parse(JSON.stringify(_id))
          console.log(id_j);
          const elemento = {id:id_j, nombre, descripcion, codigo, foto, precio, stock }
       await carrito.productos.push(elemento)
       
      }
      
    });
    const contenido = await query.doc(id).update({productos: carrito.productos });
    return carrito
  }


  async getIdProductos(id) {
    const contenido = await query.doc(id).get()
    return contenido.data().productos
  }

   async deleteProductos(id, id_prod, prod) {
    const carrito = await this.getId(id);
    const productos = await prod;
    productos.map(async (element, i) => {
      if (element.id == id_prod) {
       await carrito.productos.splice(i, 1)
      }
      
    });

    const contenido = await query.doc(id).update({productos: carrito.productos });
    return carrito
   }
}

export default CarritoFB;
