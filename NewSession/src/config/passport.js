import passport from "passport";
import { Strategy } from "passport-local";
import Usuarios from "../containers/usuarios.js";

const user = new Usuarios()

const LocalStrategy = Strategy

passport.use('login', new LocalStrategy({
    usernameField:'email',
    passwordField: 'password'
}, async (email, password, done)=>{

const usuario = await user.getMail(email)
if (!usuario) {
    return done(null, false, {error: 'Usuario no encontrado'})
}else{
    const match = await user.matchPsw(usuario, password)
    if (match) {
        return done(null, usuario)
    } else {
        return done(null, false, {error: 'Contraseña Incorrecta'})
    }
}
}))

passport.serializeUser((user, done) =>{
    done(null, user.id)
})

passport.deserializeUser((id, done) =>{
    user.findUserId(id, done)
})

export default passport

