class Carrito {
    constructor(carrito) {
      this.carrito = carrito;
    }
  
    getId(id) {
      let prodId = {};
      this.carrito.map((carrito) => {
        if (carrito.id == id) {
          prodId = carrito;
        }
      });
      return prodId;
    }
  
    postProducts(req) {
      let newId = 0;
      if (this.carrito.length == 0) {
        newId = 1;
      } else {
        newId = this.carrito[this.carrito.length - 1].id + 1;
      }
  
      this.carrito.push({ id: newId, ...req.body });
      return this.carrito;
    }
  
    putPorducts(req) {
      const { id } = req.params;
      const { title, price, thumbnail } = req.body;
      this.carrito.map((carrito) => {
        if (producto.id == id) {
            carrito.title = title;
            carrito.price = price;
            carrito.thumbnail = thumbnail;
        }
      });
      return this.carrito;
    }
  
    deleteProducts(req) {
      const { id } = req.params;
      this.carrito.map((carrito, i) => {
        if (carrito.id == id) {
          this.carrito.splice(i, 1);
        }
      });
      return this.carrito;
    }
  
    errorMsg(foo, req) {
      const { id } = req.params;
      const idExist = this.carrito.find((carrito) => carrito.id == id);
      if (idExist) {
        return foo;
      } else {
        return { error: "Carrito no encontrado" };
      }
    }
  }
  
  module.exports = Carrito;