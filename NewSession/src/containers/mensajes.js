import query from '../db/DBconnection.js';
import { normalize, denormalize, schema  } from "normalizr";
import util from 'util'


const author = new schema.Entity('author');
const mensaje = new schema.Entity('mensaje', {
 author: author 
},{ idAttribute: "id" })

function print(obj) {
  console.log(util.inspect(obj, false, 12, true));
}



class Mensajes {
    constructor() {
        
    }

  async getAll() {
    try {
        const datos = []
      const contenido = await query.get();
      
      contenido.forEach(doc =>{
        const denormalizedData = denormalize(doc.data().normalizedData.result, mensaje, doc.data().normalizedData.entities);
          datos.push(denormalizedData)
      })
      return datos
    } catch (err) {
      return console.log("Error de lectura", err);
    }
  }

  

   async insertarMensajes(data){
        
        function padTo2Digits(num) {
            return num.toString().padStart(2, '0');
          }
          
          function formatDate(date) {
            return (
              [
                date.getFullYear(),
                padTo2Digits(date.getMonth() + 1),
                padTo2Digits(date.getDate()),
              ].join('-') +
              ' ' +
              [
                padTo2Digits(date.getHours()),
                padTo2Digits(date.getMinutes()),
                padTo2Digits(date.getSeconds()),
              ].join(':')
            );
          }
          const {author, text } = data
          const msg = {id:"mensaje", author, date: formatDate(new Date()), text}
          const normalizedData = normalize(msg, mensaje);
          const contenido = await query.add({normalizedData})

        return contenido
    }

}

export default Mensajes;