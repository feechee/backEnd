const express = require('express');
const app = express()
const { Router } = require('express');
const router = Router()
const productos = []
const Contenedor = require('./contenedor.js')
let compra = new Contenedor(productos)

//Middlewares
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(express.static('./public'))
app.use('/api/productos', router)

//Routes
router.get('/', (req, res)=>{
  res.send(productos)
})

router.get('/:id', (req, res) =>{
  const { id } = req.params
  res.json(compra.errorMsg(compra.getId(id), req))
})

router.post('/', (req, res) =>{

  res.json(compra.postProducts(req))
})

router.put('/:id', async (req, res)=>{
res.json(compra.errorMsg(compra.putPorducts(req), req))

})

router.delete('/:id', (req, res)=>{
  res.send(compra.deleteProducts(req))
})

//Start Server
const PORT = 8080
const server = app.listen(PORT, ()=>{
    console.log('Servidor HTTP escuchando por el puerto:', PORT);
  })
  
  server.on('error', error => console.log('Error en servidor: ', error))