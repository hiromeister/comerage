import express from "express";
import bodyParser from "body-parser";
import exphbs from "express-handlebars";

import categoryController from "./app/controllers/categoryController";
import articleController from "./app/controllers/articleController";

const app = express();
const hbs = exphbs.create({
  layoutsDir: `app/views/layouts`,
  defaultLayout: "main",
  extname: "hbs"
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.engine("hbs", hbs.engine);
app.set("view engine", "hbs");
app.set("views", "app/views");

app.use(express.static(__dirname + "/public"));

app.get("/", (req, res) => {
  res.render("home");
});

app.get("/article/creer", categoryController.get);
app.get("/article/:id", articleController.getArticleDetails);
app.get("/articles", articleController.get);
app.get("/articles/:category", articleController.getArticlesByCategory);

app.post("/article/creer", articleController.create());

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});
