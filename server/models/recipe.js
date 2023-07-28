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
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
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
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Like",
      },
    ],
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
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Recipe = mongoose.model("Recipe", recipeSchema);

module.exports = { Recipe };
