import { Router } from 'express'
import emailCtrl from '../controllers/email.controllers.js'
import helpers from '../helpers/auth.js'

const routerEmail = Router()
const isAuth = helpers.isAuthenticated


routerEmail.get('/api/email/:id',isAuth, emailCtrl.enviar )


export default routerEmail;