import { Router } from 'express'
import vistaCtrl from '../controllers/vistas.controller.js';
import helpers from '../helpers/auth.js'

const routerVista = Router()
const isAuth = helpers.isAuthenticated


routerVista.get('/',isAuth, vistaCtrl.renderIndex )


export default routerVista;