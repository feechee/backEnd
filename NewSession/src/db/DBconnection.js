import admin from "firebase-admin";
import fs from "fs";

const serviceAccount = JSON.parse(
  fs.readFileSync(
    "./src/db/normalizr-54cc6-firebase-adminsdk-4luqz-6e73ea689e.json"
  )
);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

console.log("conectado");

const db = admin.firestore();
const query = db.collection("mensajes");

export default query;