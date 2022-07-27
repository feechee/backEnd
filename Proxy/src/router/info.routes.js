import { info } from 'console';
import { Router } from 'express'
import infoCtrl from '../controllers/info.controller.js';
const routerInfo = Router()

routerInfo.get('/info', infoCtrl.renderInfo )



export default routerInfo;