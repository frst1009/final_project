const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema({
  ingredients: [
    {
      type: String,
      required: true
    },
  ],
  category: 
    {
      type: String,
      required: true
    }
  ,
  user:
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  title:
    {
      type: String, required: true
    },
  tags: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tags",
    },
  ],
  additionalDetails: {
    type: String,
    required: true
  },
  image: {
    type: String, required: true
  },
  cookingTime: {
    type: Number, required: true
  }
});

const Recipe = mongoose.model("Recipe", recipeSchema);

module.exports = { Recipe };
