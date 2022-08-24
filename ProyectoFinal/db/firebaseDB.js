import admin from "firebase-admin";
import fs from "fs";
import logger from "../utils/logger.js"


const serviceAccount = JSON.parse(
  fs.readFileSync(
    "./db/ecommerce-e95a6-firebase-adminsdk-2tonm-29f817750f.json"
  )
);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

logger.info("conectado a FireBase");

const db = admin.firestore();
const query = db.collection("carrito");

export default query;