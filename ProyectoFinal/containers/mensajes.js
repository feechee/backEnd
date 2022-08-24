import twilio from 'twilio'
import logger from "../utils/logger.js";

const accountSid ="AC64f7947d96557c5b489610c7a2fbe980";
const authToken = "35c950fec504203a2a8c8a43914c2ab2";
const client = twilio(accountSid, authToken)


const mensaje = "Usted finalizo su compra de:"

async function enviarWapp(number) {
    try{
        const numero = number || "+5491154956460"
        const message = await client.messages.create({
            body: mensaje,
            to: `whatsapp:${numero}`,
            from: "whatsapp:+14155238886"  
        })
    }catch(error){
        logger.error(error);
    }
}

export default enviarWapp
