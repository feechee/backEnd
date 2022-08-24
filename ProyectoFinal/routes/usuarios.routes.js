import Usuarios from "../containers/usuarios.js";
import passport from "passport";
import logger from "../utils/logger.js";
import express from "express";

const router = express.Router();
const user = new Usuarios()


router.get("/signup", (req, res) =>{
    logger.info('Petición en ruta /signup')
    res.render('users/signup')
})

router.post("/signup", async (req, res) =>{
    const errors = [];
    const {nombre, email, password, confirm_password} = req.body;
    if(password != confirm_password){
        errors.push({text: "No coincide la contraseña"})
    }
    if (password.length < 4) {
        errors.push({text:"La contraseña debe poseer mas de 4 caracteres"})
    }
    if (errors.length > 0) {
        res.render("users/signup", { errors })
    } else {
       const emailUser = await user.getMail(email)
       if (emailUser) {
            errors.push({text: 'El e-mail ya existe'})
            res.render("users/signup", {errors})
       } else {
            await user.postUsuarios(req)
            res.redirect('signin')
       }
    }

})

router.get("/signin", (req, res) =>{
    logger.info('Petición en ruta /users/signin')
    res.render('users/signin')
})

router.post("/signin", passport.authenticate('login', {failureRedirect:'/users/signin-error', successRedirect: '/'})) 

router.get("/logout", (req, res) =>{
    const userLogout = req.user.email;
    req.logout(err => {
        logger.info('Petición en ruta /logout')
        res.render('users/logout', {user: userLogout})
      })
})

router.get("/signin-error", (req, res) =>{
    logger.info('Petición en ruta /users/signin-error')
    res.render('users/signin-error')
})



export default router;