import { Router } from 'express'
import vistaCtrl from '../controllers/vistas.controller.js';
import helpers from '../helpers/auth.js'

const routerVista = Router()
const isAuthenticated = helpers.isAuthenticated


routerVista.get('/',isAuthenticated, vistaCtrl.renderIndex )


export default routerVista;