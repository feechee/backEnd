import mongoose from 'mongoose'

async function connection() {
    try {
      const URL =
        "mongodb+srv://coderhouse:coderhouse@cluster0.vdc3e6x.mongodb.net/?retryWrites=true&w=majority";
  
      let conexion = await mongoose.connect(URL);
  
      console.log("coneccion a mongodb correcta");
    } catch (err) {
      console.log("error: ", err);
    }
  }

  export default connection