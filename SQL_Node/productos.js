import knex from "knex"

class Productos {
    constructor(options) {
        this.knex = knex(options)
    }

    crearTabla() {
        return this.knex.schema.dropTableIfExists('productos')
        .finally(()=>{
            return this.knex.schema.createTable('productos', table =>{
                table.increments('id').primary()
                table.string('title', 50).notNullable()
                table.float('price', 50)
                table.string('thumbnail', 50).notNullable()
            })
            
        })
    }

    insertarProductos(productos){
        return this.knex('productos').insert(productos)
    }

   async listarProductos(){
        const productos = []
       await this.knex.from('productos').select('title', 'price', 'thumbnail')
        .then( (rows)=>{
            for (let row of rows) {
                 productos.push({ title: row["title"], price: row["price"], thumbnail: row["thumbnail"] })    
              }
        })

        return await productos
    }

    borrarProductosId(id){
        return this.knex.from('productos').where('id', id).del()
    }

    actualizarProductoId(id, nombre){
        return this.knex.from('productos').where('id', id).update({nombre: nombre})
    }

    close(){
        this.knex.destroy()
    }
}

export default Productos;