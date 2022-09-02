import nodemailer from 'nodemailer'
import CarritoFB from './carritoFB.js';
import logger from "../utils/logger.js";

const apiCarrito = new CarritoFB

const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user:'evert.ferry15@ethereal.email',
        pass:'kMHtQd6BVxc5qNWF9C',
    },
})

class Email {
    constructor() {

    }

    async enviarEmail (id, usuario) {
        const mensaje = []
        try {
            const contenido = await apiCarrito.getIdProductos(id)
            contenido.map((cont)=>{
                mensaje.push(cont.nombre)
            })
            const asunto = `El usuario: ${usuario} realizo una compra`
            const info = await transporter.sendMail({
                from:'evert.ferry15@ethereal.email',
                to:'fedelop_10@hotmail.com',
                subject: asunto,
                text: mensaje,
            })
        } catch (error) {
            logger.error(error);
        }

    }
}

export default Email;


