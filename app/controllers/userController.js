import {User} from "../../config/database";

class userController{
    async createUser(req, res){
      
        await res.send(req.body);
        try{
        const {email, password, username} = req.body;
        const user = await User.create({email, password, username})
        }catch(err){
            console.log("Erreur de d'inscription", err)
        }
    }

}

module.exports = new userController();