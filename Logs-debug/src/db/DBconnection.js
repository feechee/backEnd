import admin from "firebase-admin";
import fs from "fs";
import logger from "../utils/logger.js";

const serviceAccount = JSON.parse(
  fs.readFileSync(
    process.env.FIREBASE_PATH
  )
);
try {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
  logger.info("firebase conectado");
} catch (error) {
  logger.error("fallo conexion con firebase error:", error)
}




const db = admin.firestore();
const query = db.collection("mensajes");

export default query;