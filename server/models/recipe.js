const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema({
  ingredients: [
    {
      type: String,
    },
  ],
  category: 
    {
      type: String
    }
  ,
  user: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  title:
    {
      type: String,
    },
  tags: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tags",
    },
  ],
  additionalDetails: {
    type: String,
  },
  image: {
    type: String,
  },
});

const Recipe = mongoose.model("Recipe", recipeSchema);

module.exports = { Recipe };
