import WhatsApp from '../containers/whatsApp.js'
import Usuarios from '../containers/usuarios.js'
import logger from "../utils/logger.js";

const newUsuario = new Usuarios()



const apiWapp = new WhatsApp
const wappCtrl = {};

wappCtrl.enviar = async (req, res, next) =>{
    const { id } = req.params;
    const user = await newUsuario.getById(req.session.passport.user)
    const numero = await user.telefono
    logger.info('Petición en ruta /api/wapp/:id')
    res.send(await apiWapp.enviarWapp(id, numero));
}

export default wappCtrl;