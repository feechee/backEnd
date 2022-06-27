import admin from "firebase-admin";
  import fs from "fs";

const serviceAccount = JSON.parse(
  fs.readFileSync(
    "./db/normalizr-54cc6-firebase-adminsdk-4luqz-a4d2387bb9.json"
  )
);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

console.log("conectado");

const db = admin.firestore();
const query = db.collection("mensajes");

export default query;