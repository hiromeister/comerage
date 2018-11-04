import express from "express";
import bodyParser from "body-parser";
import exphbs from "express-handlebars";
import session from "express-session";

import categoryController from "./app/controllers/categoryController";
import articleController from "./app/controllers/articleController";
import userController from "./app/controllers/userController";
import commentController from "./app/controllers/commentController";
import loginController from "./app/controllers/loginController";


import passport from "./config/passport";

const app = express();
const hbs = exphbs.create({
  layoutsDir: `app/views/layouts`,
  defaultLayout: "main",
  extname: "hbs",
  helpers: {
    ifCond: function(v1, v2, options) {
      if (v1 === v2) {
        return options.fn(this);
      }
      return options.inverse(this);
    },
    setVar: function(varName, varValue, options) {
      if (!options.data.root) {
        options.data.root = {};
      }
      options.data.root[varName] = varValue;
    }
  }
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.engine("hbs", hbs.engine);
app.set("view engine", "hbs");
app.set("views", "app/views");
app.use(session({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session()); 

app.use(express.static(__dirname + "/public"));

app.get("/", (req, res) => {
  res.render("home");
});

app.get("/article/creer", loginController.check, categoryController.get);
app.get("/article/:id",loginController.check, articleController.getArticleDetails);
app.get("/articles",  articleController.get);
app.get("/articles/:category", articleController.getArticlesByCategory);
app.get("/article/:id/edit",loginController.check, articleController.getArticleDataToEdit);
app.get("/article/supprimer/:id", articleController.delete);
app.get('/deconnexion', function(req, res){
  req.logout();
  res.redirect('/connexion');
});
app.get("/inscription", (req, res) => {
  res.render("signup", {layout: false});
});
app.get("/connexion", (req, res) => {
  res.render("login");
});

app.post("/article/creer", loginController.check, articleController.create());
app.post("/inscription", userController.createUser);
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

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});
