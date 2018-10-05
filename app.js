import express from "express";
import bodyParser from "body-parser";
import exphbs from "express-handlebars";
import session from "express-session";

import categoryController from "./app/controllers/categoryController";
import articleController from "./app/controllers/articleController";
import userController from "./app/controllers/userController";
import commentController from "./app/controllers/commentController";

import passport from "./config/passport";

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
app.use(passport.initialize());
app.use(passport.session());
app.use(session({ secret: "cats" }));

app.use(express.static(__dirname + "/public"));

app.get("/", (req, res) => {
  res.render("home");
});

app.get("/article/creer", categoryController.get);
app.get("/article/:id", articleController.getArticleDetails);
app.get("/articles", articleController.get);
app.get("/articles/:category", articleController.getArticlesByCategory);
app.get("/article/:id/edit", articleController.getArticleDataToEdit);

app.get("/sinscrire", (req, res) => {
  res.render("signup");
});

app.get("/connexion", (req, res) => {
  res.render("login");
});
app.post("/article/creer", articleController.create());

app.post("/sinscrire", userController.createUser);

app.post(
  "/connexion",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/connexion",
    failureFlash: true
  })
);

app.post("/article/:id", commentController.post);

app.post("/article/:id/edit", articleController.edit());

app.get("/article/supprimer/:id", articleController.delete);

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});
