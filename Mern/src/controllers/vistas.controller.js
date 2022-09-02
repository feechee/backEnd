import logger from "../utils/logger.js";
import * as url from 'url';
import path from "path";
const vistaCtrl = {};
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

vistaCtrl.renderIndex = (req, res) => {
  if(req.isAuthenticated){
    logger.info('Petición en ruta /')
    res.sendFile(path.join(__dirname+'../public/index.html'))
  } else {
    res.render('users/signin')
  }
}
export default vistaCtrl;
