import { generarProducto } from "../utils/generadorDeProductos.js";

class Productos {
    
    constructor() {
        this.elementos = [];
    }


    listarTodos() {
        const elem = []
        for (let i = 0; i < 5; i++) {
            const {title, price, thumbnail} = generarProducto();
            elem.push({id:i+1, title, price, thumbnail});
        }
        this.elementos = elem
        return [...this.elementos];
    }

}

export default Productos;