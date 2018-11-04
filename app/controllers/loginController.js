class loginController{
    check(req, res, next){
        if(req.user){
            next();
        } else {
            res.redirect("/connexion")
        }
    }
}

module.exports = new loginController();