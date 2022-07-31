import { Router } from 'express'
import userCtrl from '../controllers/users.controller.js';

const routerUsers = Router()


routerUsers.get('/users/signup', userCtrl.renderSignUpForm)

routerUsers.post('/users/signup', userCtrl.signUp)

routerUsers.get('/users/signin', userCtrl.rendersignInForm)

routerUsers.post('/users/signin', userCtrl.signIn)

routerUsers.get('/users/logout', userCtrl.logOut)

routerUsers.get('/users/signin-error', userCtrl.signInError)


export default routerUsers;