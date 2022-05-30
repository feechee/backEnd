const fs = require("fs");

class Mensajes {
  constructor(fileName) {
    this.fileName = fileName;
  }

  async getAll() {
    try {
      const contenido = await fs.promises.readFile(this.fileName, "utf-8");
      let object = JSON.parse(contenido);
      return object;
    } catch (err) {
      return console.log("Error de lectura", err);
    }
  }

 async postMensajes(data) {
    const mensajes = await this.getAll()
    
    function padTo2Digits(num) {
        return num.toString().padStart(2, '0');
      }
      
      function formatDate(date) {
        return (
          [
            date.getFullYear(),
            padTo2Digits(date.getMonth() + 1),
            padTo2Digits(date.getDate()),
          ].join('-') +
          ' ' +
          [
            padTo2Digits(date.getHours()),
            padTo2Digits(date.getMinutes()),
            padTo2Digits(date.getSeconds()),
          ].join(':')
        );
      }



    mensajes.push({ date: formatDate(new Date()), ...data });

    fs.writeFile(this.fileName, JSON.stringify(mensajes, null, 2), (err) => {
        if (err) {
          console.log("Error al crear el archivo", err);
        } else {
          console.log("El archivo se creo correctamente", mensajes);
        }
      });

    return mensajes;
  }


 async deleteMensajes(req) {
    const mensajes = await this.getAll()
    const { id } = req.params;
    mensajes.map((mensaje, i) => {
      if (mensaje.id == id) {
        mensajes.splice(i, 1);
      }
    });
    fs.writeFile(this.fileName, JSON.stringify(mensajes, null, 2), (err) => {
        if (err) {
          console.log("Error al crear el archivo", err);
        } else {
          console.log("El archivo se creo correctamente", mensajes);
        }
      });

    return mensajes;
  }


  async errorMsg(foo, req) {
    const mensajes =await this.getAll()
    const { id } = req.params;
    const idExist = mensajes.find((mensaje) => mensaje.id == id);
    if (idExist) {
      return foo;
    } else {
      return { error: "mensaje no encontrado" };
    }
  }
      
}

module.exports = Mensajes;