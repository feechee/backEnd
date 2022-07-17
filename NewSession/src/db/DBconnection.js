import admin from "firebase-admin";
import fs from "fs";

const serviceAccount = JSON.parse(
  fs.readFileSync(
    process.env.FIREBASE_PATH
  )
);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

console.log("conectado");

const db = admin.firestore();
const query = db.collection("mensajes");

export default query;