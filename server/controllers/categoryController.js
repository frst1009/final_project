const { Category } = require("../models/category");
const CategoryController = {
  getAll: async (req, res) => {
    try {
      const category = await Category.find().populate("recipe").exec();

      res.status(200).json(category);
    } catch (error) {
      res
        .status(500)
        .json({ error: "An error occurred while retrieving categories." });
    }
  },
  getById: async (req, res) => {
    try {
      const category = await Category.findById(req.params.id).populate("recipe").exec();

      if (!category) {
        res.status(404).json({ error: "Category not found." });
      } else {
        res.status(200).json(category);
      }
    } catch (error) {
      res
        .status(500)
        .json({ error: "An error occurred while retrieving the category." });
    }
  },
};

module.exports = {
  CategoryController,
};
