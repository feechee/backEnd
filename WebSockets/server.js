const express = require('express')
const {Server : HttpServer} = require('http')
const {Server : IOServer} = require('socket.io')

const app = express()
const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)



const messages = [
    {author: "Juan", message: "Hola, como va?"},
    {author: "Pedro", message: "Todo bien, vos?"},
    {author: "Juan", message: "Que bueno!"}
]

app.use(express.static('./public'))
app.get('/', (req, res)=>{
    res.sendFile('index.html', {root: __dirname})
})

io.on('connection', (socket)=>{
    console.log('Cliente conectado');
    socket.emit('messages', messages)
    socket.on('new-message', (data)=>{
        messages.push(data)
        io.sockets.emit('messages', messages)
    })
})

const PORT = 8080
httpServer.listen(PORT, ()=>{
    console.log('Servidor iniciado en el puerto:', PORT);
})




