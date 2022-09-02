import mongoose from 'mongoose';

const productosCollection = 'productos';
const productosSchemma = new mongoose.Schema({
    nombre: { type: String, required: true, max:100 },
    descripcion: { type: String, required: true, max:500 },
    codigo: { type: String, required: true, max:100 },
    foto: { type: String, required: true, max:200 },
    precio: { type: Number, required: true, max:1000000 },
    stock: { type: Number, required: true, max:100000 }
})

export const productos = mongoose.model(productosCollection, productosSchemma);