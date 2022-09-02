import { Router } from 'express'
import wappCtrl from '../controllers/whatsApp.controller.js';
import helpers from '../helpers/auth.js'

const routerWapp = Router()
const isAuth = helpers.isAuthenticated


routerWapp.get('/api/wapp/:id',isAuth, wappCtrl.enviar )


export default routerWapp;