const helpers = {}

helpers.checkAuth = (req, res, next) =>{
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect('users/signin')
}

export default helpers;