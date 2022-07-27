import mongoose from 'mongoose';
import bcrypt from  'bcryptjs'


const usuariosCollection = 'usuarios';
const usuariosSchemma = new mongoose.Schema({
    nombre: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
})

usuariosSchemma.methods.encryptPassword = async password => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

usuariosSchemma.methods.matchPassword = async function (password) {
   return await bcrypt.compare(password, this.password)
}

export const usuarios = mongoose.model(usuariosCollection, usuariosSchemma);