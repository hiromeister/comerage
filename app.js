import express from "express";
import bodyParser from "body-parser";
import exphbs from "express-handlebars";
import sequelizeInit from "./config/database";
import Sequelize from "sequelize";

/* Controllers imports */
import articleController from "./app/controllers/articleController";
import categoryController from "./app/controllers/categoryController";

/* Models import */
import {Category, Article, User} from "./app/models";

require("dotenv").config();
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/* ENV */
const {
  MYSQL_DATABASE,
  MYSQL_USERNAME,
  MYSQL_PASSWORD,
  MYSQL_HOST
} = process.env;

/* Initialize Sequelize */
const sequelize = sequelizeInit(
  MYSQL_DATABASE,
  MYSQL_USERNAME,
  MYSQL_PASSWORD,
  MYSQL_HOST
);

/* Sequelize's Models */

const category = Category(sequelize, Sequelize);

const hbs = exphbs.create({
  layoutsDir: `app/views/layouts`,
  defaultLayout: "main",
  extname: "hbs"
});

app.engine("hbs", hbs.engine);
app.set("view engine", "hbs");
app.set("views", "app/views");

app.get("/", (req, res) => {
  res.render("home");
});

app.get("/article/creer", categoryController.get);

/* POSTS */

app.post("/article/creer", articleController.create);

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});
