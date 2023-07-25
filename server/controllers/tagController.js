const { Tags } = require("../models/tags");

const TagsController = {
  add: (req, res) => {
    const tag = new Tags({
      name: req.body.name,
      recipes: req.body.recipes,
    });
    tag
      .save()
      .then((doc) => {
        res.json(doc);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  },
  getAll: async (req, res) => {
    try {
      const tag = await Tags.find().populate("recipes");

      res.status(200).json(tag);
    } catch (error) {
      res
        .status(500)
        .json({ error: "An error occurred while retrieving recipes." });
    }
  },
  getById: async (req, res) => {
    try {
      const tag = await Tags.findById(req.params.id).populate("recipes");

      if (!tag) {
        res.status(404).json({ error: "Recipe not found." });
      } else {
        res.status(200).json(tag);
      }
    } catch (error) {
      res
        .status(500)
        .json({ error: "An error occurred while retrieving the recipe." });
    }
  },
};

module.exports = {
  TagsController,
};
