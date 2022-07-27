import Usuarios from "../containers/usuarios.js";
import passport from "passport";

const user = new Usuarios()

const usersCtrl = {};


usersCtrl.renderSignUpForm = (req, res) =>{
    res.render('users/signup')
}

usersCtrl.signUp = async (req, res) =>{
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

}

usersCtrl.rendersignInForm = (req, res) =>{
    res.render('users/signin')
}

usersCtrl.signIn = passport.authenticate('login', {failureRedirect:'/users/signin-error', successRedirect: '/'}) 

usersCtrl.logOut = (req, res) =>{
    const userLogout = req.user.email;
    req.logout(err => {
        res.render('users/logout', {user: userLogout})
      })
}

usersCtrl.signInError = (req, res) =>{
    res.render('users/signin-error')
}



export default usersCtrl;