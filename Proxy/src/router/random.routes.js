import { Router } from 'express'
import randomCtrl from '../controllers/random.controller.js';
import compression from 'compression'

const routerRandom = Router()

routerRandom.get('/api/randoms/:cant',compression() , randomCtrl.renderNumbers)

routerRandom.get('/api/randoms',compression() , randomCtrl.default)



export default routerRandom;