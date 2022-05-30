const socket = io.connect();

function addMessage (e) { 
    const messages = {
        author: document.getElementById('username').value,
        message: document.getElementById('text').value
    }
    socket.emit('new-message', messages)
    return false
 }

 function addProducto() {
     const producto = {
         title: document.getElementById('title').value,
         price: document.getElementById('price').value,
         thumbnail: document.getElementById('thumbnail').value
     }
     socket.emit('new-producto', producto)
     return false
 }

function renderMsg (data) {
    
    const html = data.map((elem)=>{
        
        return(`
        <div class="contenedorMensaje">
            <strong class="email">${elem.author}</strong>
            <p class="fecha"">${elem.date}</p>
            <em class="mensaje">: ${elem.message}</em>
        </div>
        `)
    }).join(' ')

    document.getElementById('messages').innerHTML = html
 }

async function renderTable (data) {
    const html =await data.map((elem)=>{
        return(`<tr>
                    <td>${elem.title}</td>
                    <td>${elem.price}</td>
                    <td>${elem.thumbnail}</td>
                </tr>`)  
    }).join(" ")

    document.getElementById('products').innerHTML =await html
 }

socket.on('messages', data =>{renderMsg(data)})
socket.on('productos',async data =>{ await renderTable(data)})