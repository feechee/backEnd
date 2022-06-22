import mongoose from "mongoose";
import * as models from './models/usuarios.js';

async function CRUD() {  
    try {
        const URL = 'mongodb://localhost:27017/ecommerce'

        let conexion = await mongoose.connect(URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })

        console.log("coneccion a mongodb correcta");

        //Create
        const usuario = { nombre:"Federico", apellido:"Lopez", email:"fedelop_10@hotmail.com", usuario:"Fede", password:1234 }
        const usuarioCreado = await models.usuarios.create(usuario)
        console.log("Usuario creado", usuarioCreado);

        //Read
        const usuarios = await models.usuarios.find();
        console.log("Usuarios :", usuarios);


        // Update
        const usuariosActualizado = await models.usuarios.findOneAndUpdate({nombre: "Federico"}, {nombre: "fede"})
        console.log("Nombre Actualizado: ", usuariosActualizado);

        // Delete

        const usuarioEliminado = await models.usuarios.findOneAndDelete({nombre: "fede"})
        console.log("Usuario Eliminado: ", usuarioEliminado);
     
    } catch(err){
        console.log("error: ", err);
    }
}

CRUD();