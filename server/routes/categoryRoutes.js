const expres = require("express");
const { CategoryController } = require("../controllers/categoryController");

const CategoryRoutes = expres.Router();

CategoryRoutes.get("/", CategoryController.getAll);
CategoryRoutes.get("/:id", CategoryController.getById);

module.exports = {
  CategoryRoutes,
};
