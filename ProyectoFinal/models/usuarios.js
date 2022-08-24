import mongoose from 'mongoose';
import bcrypt from  'bcryptjs'

//Modelo usuario Mongo DB

const usuariosCollection = 'usuarios';
const usuariosSchemma = new mongoose.Schema({
    nombre: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    direccion: {type: String, required: true},
    edad: {type: Number, required: true},
    telefono: {type: Number, required: true},
    avatar: {type: String, required: true}

})

//-------------------------------------------------------------------//

//Encriptacion de contraseña

usuariosSchemma.methods.encryptPassword = async password => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

usuariosSchemma.methods.matchPassword = async function (password) {
   return await bcrypt.compare(password, this.password)
}

//--------------------------------------------------------------------------//

export const usuarios = mongoose.model(usuariosCollection, usuariosSchemma);