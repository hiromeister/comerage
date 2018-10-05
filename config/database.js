import Sequelize from "sequelize";
import ArticleModel from "../app/models/Article";
import CategoryModel from "../app/models/Category";
import Article_has_CategoryModel from "../app/models/Article_has_Category";
import UserModel from "../app/models/User";
import CommentModel from "../app/models/Comments";
require("dotenv").config();

const {
  MYSQL_DATABASE,
  MYSQL_USERNAME,
  MYSQL_PASSWORD,
  MYSQL_HOST
} = process.env;

const db = new Sequelize(MYSQL_DATABASE, MYSQL_USERNAME, MYSQL_PASSWORD, {
  host: MYSQL_HOST,
  dialect: "mysql",
  pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

const Article = ArticleModel(db, Sequelize);
const Category = CategoryModel(db, Sequelize);
const ArticleCategory = Article_has_CategoryModel(db, Sequelize);
const User = UserModel(db, Sequelize);
const Comments = CommentModel(db, Sequelize);

Article.belongsToMany(Category, { through: ArticleCategory, unique: false });
Category.belongsToMany(Article, { through: ArticleCategory, unique: false });
Article.hasOne(User);
Comments.belongsTo(Article);
Comments.belongsTo(User);

module.exports = {
  Article,
  Category,
  ArticleCategory,
  User,
  Comments
};
