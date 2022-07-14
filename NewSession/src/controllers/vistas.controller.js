const vistaCtrl = {};


vistaCtrl.renderIndex = (req, res) => {
  if(req.isAuthenticated){
    console.log(req.user);
    res.render('index',{ user: req.user.email })
  } else {
    res.render('users/signin')
  }
}
export default vistaCtrl;
