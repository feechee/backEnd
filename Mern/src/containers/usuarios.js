import * as models from "../models/usuarios.js";
import dotenv from 'dotenv'

dotenv.config()


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

    async getById(id){
      const contenido = await models.usuarios.findOne({ _id: id });
      return contenido;
    }

    async findUserId(id, done){
        models.usuarios.findById(id, (err, user)=>{
         return done(err, user)
        })
      
    }

}

export default Usuarios