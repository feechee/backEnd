import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

async function connection() {
    try {
      const URL =
        process.env.MONGO_URL;
  
      let conexion = await mongoose.connect(URL);
  
      console.log("coneccion a mongodb correcta");
    } catch (err) {
      console.log("error: ", err);
    }
  }

  export default connection