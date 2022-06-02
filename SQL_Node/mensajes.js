import knex from "knex"

class Mensajes {
    constructor(options) {
        this.knex = knex(options)
    }

    crearTabla() {
        return this.knex.schema.dropTableIfExists('mensajes')
        .finally(()=>{
            return this.knex.schema.createTable('mensajes', table =>{
                table.increments('id').primary()
                table.string('date', 50).notNullable()
                table.string('author', 50).notNullable()
                table.string('message', 50).notNullable()
            })
            
        })
    }

   async insertarMensajes(data){
        const newMsg = await this.listarMensajes()

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

          newMsg.push({ date: formatDate(new Date()), ...data })


        return this.knex('mensajes').insert(newMsg)
    }

   async listarMensajes(){
        const mensajes = []
       await this.knex.from('mensajes').select('date', 'author', 'message')
        .then( (rows)=>{
            for (let row of rows) {
                 mensajes.push({ date: row["date"], author: row["author"], message: row["message"] })    
              }
        })

        return await mensajes
    }

    borrarProductosId(id){
        return this.knex.from('mensajes').where('id', id).del()
    }

    actualizarProductoId(id, nombre){
        return this.knex.from('mensajes').where('id', id).update({nombre: nombre})
    }

    close(){
        this.knex.destroy()
    }
}

export default Mensajes;