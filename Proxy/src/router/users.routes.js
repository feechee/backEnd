import { Router } from 'express'
import userCtrl from '../controllers/users.controller.js';
import compression from 'compression'

const routerUsers = Router()


routerUsers.get('/users/signup', compression(), userCtrl.renderSignUpForm)

routerUsers.post('/users/signup', compression(), userCtrl.signUp)

routerUsers.get('/users/signin', compression(), userCtrl.rendersignInForm)

routerUsers.post('/users/signin', compression(), userCtrl.signIn)

routerUsers.get('/users/logout', compression(), userCtrl.logOut)

routerUsers.get('/users/signin-error',compression(), userCtrl.signInError)


export default routerUsers;