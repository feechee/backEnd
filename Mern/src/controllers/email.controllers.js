import Email from '../containers/email.js'
import Usuarios from '../containers/usuarios.js'
import logger from "../utils/logger.js";

const newUsuario = new Usuarios()



const apiEmail = new Email
const emailCtrl = {};

emailCtrl.enviar = async (req, res, next) =>{
    const { id } = req.params;
    const user = await newUsuario.getById(req.session.passport.user)
    const usuario = await user.email
    logger.info('Petición en ruta /api/email/:id')
    res.send(await apiEmail.enviarEmail(id, usuario));
}

export default emailCtrl;