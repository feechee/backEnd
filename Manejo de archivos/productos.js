const Contenedor = require('./contenedor.js')
let archivo1 = new Contenedor("./productos.json");


let producto1 = {
    title: "Escuadra",
    price: 123.45,
    thumbnail:
      "https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png",
  };
  
  let producto2 = {
    title: "Calculadora",
    price: 234.56,
    thumbnail:
      "https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png",
  };
  let producto3 = {
    title: "Globo Terráqueo",
    price: 345.67,
    thumbnail:
      "https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png",
  };

  
  archivo1.getAll();
/* archivo1.save(producto3) */
/* archivo1.deleteAll() */
/* archivo1.deleteById(1) */
/* archivo1.getById(1) */