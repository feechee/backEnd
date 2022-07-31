import mongoose from 'mongoose'
import dotenv from 'dotenv'
import logger from '../utils/logger.js'

dotenv.config()

async function connection() {
    try {
      const URL =
        process.env.MONGO_URL;
  
      let conexion = await mongoose.connect(URL);
  
      logger.info("conexion a mongodb correcta");
    } catch (err) {
      logger.error("Conexion a Mongo fallida: ", err);
    }
  }

  export default connection