const socket = io.connect();

function addMessage (e) { 
    const messages = {
        author: document.getElementById('username').value,
        message: document.getElementById('text').value
    }
    socket.emit('new-message', messages)
    return false
 }

function render (data) { 
    const html = data.map((elem)=>{
        return(`
        <div>
            <strong>${elem.author}</strong>
            <em>${elem.message}</em>
        </div>
        `)
    }).join(' ')

    document.getElementById('messages').innerHTML = html
 }

socket.on('messages', data =>{render(data)})