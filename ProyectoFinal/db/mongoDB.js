import mongoose from "mongoose";
import logger from "../utils/logger.js"

async function connection() {
    try {
      const URL =
        "mongodb+srv://coderhouse:coderhouse@cluster0.vdc3e6x.mongodb.net/?retryWrites=true&w=majority";
  
      let conexion = await mongoose.connect(URL);
  
      logger.info("coneccion a mongodb correcta");
    } catch (err) {
      logger.error("error: ", err);
    }
  }
 export default connection;