import { Router } from 'express'
import vistaCtrl from '../controllers/vistas.controller.js';
import helpers from '../helpers/auth.js'
import compression from 'compression'

const routerVista = Router()
const isAuthenticated = helpers.isAuthenticated


routerVista.get('/',isAuthenticated, compression(), vistaCtrl.renderIndex )


export default routerVista;