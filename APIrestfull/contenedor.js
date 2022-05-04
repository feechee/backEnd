class Contenedor {
  constructor(productos) {
    this.productos = productos;
  }

  getId(id) {
      let prodId = {}
    this.productos.map((producto)=>{
        if (producto.id == id) {
            prodId = producto
        }
    })
    return prodId
  }

  postProducts(req) {
    let newId = 0;
    if (this.productos.length == 0) {
      newId = 1;
    } else {
      newId = this.productos[this.productos.length - 1].id + 1;
    }

    this.productos.push({ id: newId, ...req.body });
    return this.productos;
  }

  putPorducts(req) {
    const { id } = req.params;
    const idExist = this.productos.find((producto) => producto.id == id);
    const { title, price, thumbnail } = req.body;
    this.productos.map((producto) => {
      if (producto.id == id) {
        producto.title = title;
        producto.price = price;
        producto.thumbnail = thumbnail;
      }
    });
    return this.productos;
  }

  deleteProducts(req){
    const { id } = req.params
    this.productos.map((producto, i)=>{
        if(producto.id == id){
            this.productos.splice(i, 1)
        }
    })
    return this.productos
  }

  errorMsg(foo, req){
    const { id } = req.params
    const idExist = this.productos.find((producto) => producto.id == id);
    if (idExist) {
       return foo
    } else {
        return { error: "producto no encontrado" }
    }
  }
}

module.exports = Contenedor;
