


const { Recipe } = require("../models/recipe");


const RecipeController = {
  add: (req, res) => {
      const recipe = new Recipe({
        ingredients: req.body.ingredients,
        category: req.body.category, 
        title: req.body.title,
        tags: req.body.tags,
        instructions: req.body.instructions,
        image: req.file.path,
       
        cookingTime: req.body.cookingTime,
         user: req.body.user,

      });
      
   
      recipe
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
      const recipes = await Recipe.find()
      .populate("user")
      .exec();

      res.status(200).json(recipes);
    } catch (error) {
      res
        .status(500)
        .json({ error: "An error occurred while retrieving recipes." });
    }
  },
  getById: async (req, res) => {
    try {
      const recipe = await Recipe.findById(req.params.id)
        .populate("user")
        .exec();

      if (!recipe) {
        res.status(404).json({ error: "Recipe not found." });
      } else {
        res.status(200).json(recipe);
      }
    } catch (error) {
      res
        .status(500)
        .json({ error: "An error occurred while retrieving the recipe." });
    }
  },

};

module.exports = { RecipeController };

