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
      required: true,
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
  instructions: {
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
  comments: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      },
    
    }
  ]
});

const Recipe = mongoose.model("Recipe", recipeSchema);

module.exports = { Recipe };
