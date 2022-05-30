const { options } = require('./options/mysqlconn.js')
const knex = require('knex')(options)

const usuarios = [
    {nombre:'Fedrico', apellido:'Lopez', edad:'34', email:'fedelop_10@hotmail.com'},
    {nombre:'Pedrio', apellido:'Garcia', edad:'20', email:'pedrogarcia@hotmail.com'},
    {nombre:'Carlos', apellido:'Gomez', edad:'23', email:'carlosgomez@hotmail.com'}
]

knex('usuarios').insert(usuarios)
    .then(()=> console.log('se inserto la data'))
    .catch((err)=>{console.log(err); throw err})
    .finally(()=>{
        knex.destroy()
    })