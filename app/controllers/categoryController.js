import { Category } from "../models/";

class categoryController {
  async get(req, res) {
    const categories = await Category.findAll();
    console.log("Catégories :", categories);
  }
}

module.exports = new categoryController();
