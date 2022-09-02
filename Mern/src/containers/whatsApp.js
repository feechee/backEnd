import twilio from 'twilio'
import logger from "../utils/logger.js";
import CarritoFB from './carritoFB.js';

const apiCarrito = new CarritoFB
const accountSid ="AC64f7947d96557c5b489610c7a2fbe980";
const authToken = "a34332beaece92b752e81c13f8af0137";
const client = twilio(accountSid, authToken)


class WhatsApp {
    constructor() {}

    async enviarWapp (msg, number) {
        const mensaje = []
        try{
           const contenido = await apiCarrito.getIdProductos(msg)
           
           contenido.map((cont)=>{
            mensaje.push(cont.nombre)

           })

            const message = await client.messages.create({
                body:`Finalizo su compra de:${mensaje}` ,
                to: `whatsapp:${number}`,
                from: "whatsapp:+14155238886"  
            })
        }catch(error){
            logger.error(error);
        }
        return {mensaje: 'Mensaje enviado',
                numero: number,
                contenido: mensaje
                }
    }
    
}



export default WhatsApp