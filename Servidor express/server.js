const express = require('express')
const Contenedor = require('./contenedor.js')
let archivo1 = new Contenedor("./productos.json");


const PORT = 8080
const app = express()
const productos = archivo1.getAll()
let productoAleatorio = productos.then((datos)=>{return datos})
console.log(productoAleatorio);
const server = app.listen(PORT, ()=>{
  console.log('Servidor http escuchando  en el puerto ' +PORT);
})

 app.get('/productos', (req, res)=>{
    productos.then((datos)=>{res.send(datos)})
  
  
})

app.get('/productoRandom', (req, res)=>{
    productos.then((datos)=>{
        let numeroAleatorio = Math.floor(Math.random() * datos.length)
        
       return res.send(datos[numeroAleatorio])
    })
})
