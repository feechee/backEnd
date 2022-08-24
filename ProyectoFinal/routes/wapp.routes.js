import express from "express";
import enviarWapp from "../containers/mensajes.js";
import helpers from '../helpers/auth.js'

const router = express.Router();
const checkAuth = helpers.checkAuth

router.get('/', checkAuth, async (req, res)=>{
    console.log(req.user.telefono);
  const wapp = await enviarWapp()
  res.render('finalizarCompra')
})

export default router;



