import { Article, ArticleCategory, Category } from "../../config/database";
class articleController {
  create() {
    return async (req, res) => {
      const { title, body, category, isPrivate } = req.body;
      try {
        if (!isPrivate) {
          const article = await Article.create({
            title,
            body,
            userId: 1,
            isPrivate: false,
            publicationDate: new Date()
          });

          for (let i = 0; i < category.length; i++) {
            await ArticleCategory.create({
              Article_id: article.id,
              Category_id: category[i]
            });
          }
        } else {
          const article = await Article.create({
            title,
            body,
            userId: 1,
            isPrivate,
            publicationDate: new Date()
          });

          for (let i = 0; i < category.length; i++) {
            await ArticleCategory.create({
              Article_id: article.id,
              Category_id: category[i]
            });
          }
        }

        res.render("createArticle");
      } catch (error) {
        console.log("error insert article");
      }
    };
  }

  async get(req, res) {
    const articles = await Article.findAll();
    const categories = await Category.findAll();

    res.render("listArticle", {
      article: articles,
      category: categories
    });
  }

  async getArticleDetails(req, res) {
   const article = await Article.findAll({
      where: { id: req.params.id }
    });

     res.render("article", {article: article});
  }

  async getArticlesByCategory(req, res){
    const categories = await Category.findAll();
    const articles = await Article.findAll({
      include : [
        {
          model : Category,
          where : {
            name: req.params.category
          }
        }
      ]
    })
    res.render("listArticle", {article: articles, category: categories})
  }

}

module.exports = new articleController();
