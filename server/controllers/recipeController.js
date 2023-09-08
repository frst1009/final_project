const { Recipe } = require("../models/recipe");
const { User } = require("../models/user");

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
      const recipes = await Recipe.find().populate("user").sort({ createdAt: -1 }).exec();

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
getpopulars: async (req, res) => {
  try {
    const popularRecipes = await Recipe.find().populate("user")
      .sort({ likes: -1 })
      .limit(50)
      .exec();

    res.status(200).json(popularRecipes);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
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

// comments
  comments: async (req, res) => {
    try {
      const { comment} = req.body;
const postId = req.params.id;
const userId = req.userId; 
      const recipe = await Recipe.findById(postId);
      if (!recipe) {
        return res.status(404).json({ message: "Recipe not found" });
      }
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      const newComment = {
        comment: comment,
        username: user.username,
        user: req.userId,
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

deleteComment: async (req, res) => {
  try {
    const commentId = req.params.commentId;
    const userId = req.userId;
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) {
      return res.status(404).json({ message: 'Recipe not found' });
    }
    const commentToDelete = recipe.comments.find(
      (comment) => comment._id.toString() === commentId
    );
    if (!commentToDelete) {
      return res.status(404).json({ message: 'Comment not found' });
    }
    if (commentToDelete.user.toString() !== userId) {
      return res.status(403).json({ message: 'Can not delete comment!' });
    }
    recipe.comments.pull(commentToDelete);
    await recipe.save();

    res.status(200).json({ message: 'Comment was deleted successfully!' });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Could not delete comment!' });
  }

},
editComment: async(req,res)=>{
try {
  const { comment } = req.body;
  const commentId = req.params.commentId;
  const recipeId = req.params.id;
  const userId = req.userId;
  const recipe = await Recipe.findById(recipeId);
  if (!recipe) {
    return res.status(404).json({ message: "Recipe not found" });
  }
  const editedComment = recipe.comments.find((c) => c._id.toString() === commentId);
  if (!editedComment) {
    return res.status(404).json({ message: "Comment not found" });
  }
  if (editedComment.user.toString() !== userId) {
    return res.status(403).json({ message: "You are not authorized to edit this comment" });
  }
  editedComment.comment = comment;
  await recipe.save();

  res.status(200).json({
    msg: "Comment edited successfully",
    comment: editedComment,
  });
} catch (error) {
  console.error(error.message);
  res.status(500).json({ msg: "Failed to edit comment" });
}
},
// comments
  tags: async (req, res) => {
    try {
      const recipe = await Recipe.find().sort({ createdAt: -1 }).limit(5).exec();


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

  gettags: async (req, res) => {
    try {
      const tag = req.params.tag;
      const recipes = await Recipe.find({ tags: { $in: [tag] } }).populate("user").exec();
  
      res.status(200).json(recipes);
    } catch (err) {
      console.log(err);
      res.status(500).json({
        error: err.message,
      });
    }
  },
  
  categories: async (req, res) => {
    try {
      const selectedCategory = req.query.category;
      const recipes = await Recipe.find({ category: selectedCategory }).populate("user").exec();
  
      res.status(200).json(recipes);
    } catch (error) {
      console.log(error);
      res.status(500).json({
        error: "An error occurred while retrieving recipes by category.",
      });
    }
  },
recipeOfUser: async (req,res)=>{
try {
  const userId = req.userId; 
  const recipe = await Recipe.find({ user: userId });
  res.status(200).json(recipe);
} catch (error) {
  console.log(error);
  res.status(500).json({
    error: "An error occurred while retrieving recipes for user.",
  });
}
},

 searchByTitle: async (req, res) => {
  const searchQuery = req.query.title; 
  try {
   
    const recipes = await Recipe.find({ title: { $regex: searchQuery, $options: "i" } });
   
    res.status(200).json(recipes);
  } catch (error) {
    res.status(500).json({ message: "Error searching recipes by title." });
  }
},

};

module.exports = { RecipeController };
