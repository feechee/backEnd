import mongoose from "mongoose";
import * as models from "../models/usuarios.js";
import dotenv from 'dotenv'

dotenv.config()


async function conection() {
    try {
      const URL =
        process.env.MONGO_URL;
  
      let conexion = await mongoose.connect(URL);
  
      console.log("coneccion a mongodb correcta");
    } catch (err) {
      console.log("error: ", err);
    }
  }
  conection();

class Usuarios {
    constructor() {

    }

    async getAll() {
      try {
        const contenido = await models.usuarios.find();
        return contenido;
      } catch (err) {
        return console.log("Error de lectura", err);
      }
    }

    async postUsuarios(req) {
      const usuario = models.usuarios(req.body);

      usuario.password = await usuario.encryptPassword(usuario.password)
      console.log(usuario);
      const usuarioCreado = await models.usuarios.create(usuario);
      return usuarioCreado;
    }

    async getMail(mail) {
      const mailUsuario = await models.usuarios.findOne({email: mail})

      return mailUsuario

    }

    async matchPsw(user, password){
      const match = await user.matchPassword(password)

      return match
    }

    async findUserId(id, done){
        models.usuarios.findById(id, (err, user)=>{
         return done(err, user)
        })
      
    }

}

export default Usuarios