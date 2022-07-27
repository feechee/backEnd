import { Router } from 'express'
import randomCtrl from '../controllers/random.controller.js';
const routerRandom = Router()

routerRandom.get('/api/randoms/:cant', randomCtrl.renderNumbers)

routerRandom.get('/api/randoms', randomCtrl.default)



export default routerRandom;