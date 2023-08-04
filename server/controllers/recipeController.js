


const { Recipe } = require("../models/recipe");


const RecipeController = {
  add:  async (req, res) => {
    try{ 
    const recipe = new Recipe({
        ingredients: req.body.ingredients,
        category: req.body.category, 
        title: req.body.title,
        tags: req.body.tags,
        instructions: req.body.instructions,
        image: req.file.path,
        cookingTime: req.body.cookingTime,
        user: req.userId,
      }); 
     
      
      const doc = await recipe.save();
      res.json(doc);
    } catch (err) {
      res.status(500).json(err);
    }
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
  hanldlelike: async (req, res) =>{
    try{
      const post = req.params.id;
      const user = req.userId;
  
      const doc = await Recipe.findById(post);
  
      if(doc){
        
        if(!doc.likes.includes(user)){
          await Recipe.updateOne({_id : post}, {$push : { likes : user}});
          res.status(200).json({msg : "You like the post", liked : true})
          console.log("You liked the post");
        }
        else{
          await Recipe.updateOne({ _id : post },{ $pull: { likes : user }});
          res.status(200).json({msg : "You disliked the post", liked : false});
          console.log("You disliked the post");
        }
      }
      else{
        res.json({msg : "Something wents wrong", liked : false});
      }
  
    }
    catch(error){
      res.json({msg : error.message, liked : false});
    }
  },
  
};

module.exports = { RecipeController };

