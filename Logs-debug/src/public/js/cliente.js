

fetch("api/productos-test")
  .then((response) => response.json())
  .then((data) => renderTable(data));


function addMessage(e) {
  const messages = {
    author: {
      id: document.getElementById("username").value,
      nombre: document.getElementById("name").value,
      apellido: document.getElementById("lastName").value,
      edad: document.getElementById("age").value,
      alias: document.getElementById("alias").value,
      avatar: document.getElementById("avatar").value
    },
    text: document.getElementById("text").value,
  };
  socket.emit("new-message", messages);
  return false;
}

async function renderUsuario(data){
  if (data.nombre != undefined) {
    const html = `<h2>${await data.nombre}<h2>`
    document.getElementById("usuario").innerHTML = html;
  }
  
}


function renderMsg(data) {
  const html = data
    .map((elem) => {
      return `
        <div class="contenedorMensaje">
            <strong class="email">${elem.author.id}</strong>
            <p class="fecha"">${elem.date}</p>
            <em class="mensaje">: ${elem.text}</em>
        </div>
        `;
    })
    .join(" ");

  document.getElementById("messages").innerHTML = html;
}

async function renderTable(data) {
  console.log(data);
  const html = await data
    .map((elem) => {
      return `<tr>
                    <td>${elem.title}</td>
                    <td>${elem.price}</td>
                    <td><img class="foto" src="${elem.thumbnail}" alt=""></td>
                </tr>`;
    })
    .join(" ");

  document.getElementById("products").innerHTML = await html;
}

socket.on("messages", (data) => {
    console.log(data);
  renderMsg(data);
});
socket.on("productos", async (data) => {
  await renderTable(data);
});
