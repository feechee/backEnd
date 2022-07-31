import { info } from 'console';
import { Router } from 'express'
import infoCtrl from '../controllers/info.controller.js';
import compression from 'compression'

const routerInfo = Router()

routerInfo.get('/info',compression() , infoCtrl.renderInfo )



export default routerInfo;