import { Article } from "../models/Article/Article";

class articleController {
  create(req, res) {
    try {
      console.log(req.body);
      Article.create(req.body);
    } catch (err) {
      res.status(400).send("Impossible de sauvegarder dans la db");
    }
  }
}

module.exports = new articleController();
