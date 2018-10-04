import { Category } from "../../config/database";

class categoryController {
  get(req, res) {
    Category.findAll().then(categories => {
      res.render("createArticle", { categories: categories });
    });
  }

  getForArticleList(req, res){
    Category.findAll().then(categories => {
      res.render("listArticle", { categories: categories });
    });
  }
}

module.exports = new categoryController();
