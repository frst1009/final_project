const { Recipe } = require("../models/recipe");

const RecipeController = {
  add: async (req, res) => {
    try {
      const recipe = new Recipe({
        ingredients: req.body.ingredients,
        category: req.body.category,
        title: req.body.title,
        tags: req.body.tags,
        instructions: req.body.instructions,
        image: req.body.image,
        cookingTime: req.body.cookingTime,
        user: req.userId,
      });

      const doc = await recipe.save();
      res.json(doc);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  getAll: async (req, res) => {
    try {
      const recipes = await Recipe.find().populate("user").exec();

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
  hanldlelike: async (req, res) => {
    try {
      const recipe = req.params.id;
      const user = req.userId;
      const doc = await Recipe.findById(recipe);
      if (doc) {
        if (!doc.likes.includes(user)) {
          await Recipe.updateOne({ _id: recipe }, { $push: { likes: user } });
          res.status(200).json({ msg: "You liked the recipe", liked: true });
          console.log("You liked the recipe");
        } else {
          await Recipe.updateOne({ _id: recipe }, { $pull: { likes: user } });
          res
            .status(200)
            .json({ msg: "You disliked the recipe", liked: false });
          console.log("You disliked the recipe");
        }
      } else {
        res.json({ msg: "Something wents wrong", liked: false });
      }
    } catch (error) {
      res.json({ msg: error.message, liked: false });
    }
  },
  deleterecipe: async (req, res) => {
    try {
      const recipeId = req.params.id;
      const doc = await Recipe.findByIdAndDelete(recipeId);
      if (doc) {
        res.status(200).json({ msg: "You deleted the recipe!", recipe: doc });
      } else {
        res
          .status(404)
          .json({ msg: "Something went wrong! Could not delete recipe!" });
      }
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ msg: "Could not find recipe!" });
    }
  },

  update: async (req, res) => {
    try {
      const postId = req.params.id;

      const updatedRecipe = await Recipe.findByIdAndUpdate(
        postId,
        {
          ingredients: req.body.ingredients,
          category: req.body.category,
          title: req.body.title,
          tags: req.body.tags,
          instructions: req.body.instructions,
          cookingTime: req.body.cookingTime,
          user: req.userId,
          image: req.body.image,
        },
        { new: true }
      );

      if (!updatedRecipe) {
        return res.status(404).json({ message: "Recipe not found" });
      }

      res.json({
        success: true,
        recipe: updatedRecipe,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        message: "Failed to update the recipe",
      });
    }
  },
  comments: async (req, res) => {
    try {
      const { comment, postId } = req.body;

      const recipe = await Recipe.findById(postId);
      if (!recipe) {
        return res.status(404).json({ message: "Recipe not found" });
      }

      const newComment = {
        user: req.userId,
        comment: comment,
        postId: postId,
      };

      recipe.comments.push(newComment);
      await recipe.save();

      res.status(200).json({
        msg: "Comment Posted Successfully !!",
        comment: newComment,
      });
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ msg: "Failed to add comment" });
    }
  },

  tags: async (req, res) => {
    try {
      const recipe = await Recipe.find().limit(5).exec();


      const tags = recipe
        .map((obj) => obj.tags)
        .flat()
        .slice(0, 8);


      res.json(tags);
    } catch (err) {
      console.log(err);
      res.status(500).json({
        error: err.message,
      });
    }
  },
};

module.exports = { RecipeController };
