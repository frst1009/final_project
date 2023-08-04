const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema({
  //recipe related information
  ingredients: [
    {
      type: String,
      required: true,
    },
  ],
  category: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  tags: [String],
  instructions: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  cookingTime: {
    type: Number,
    required: true,
  },
  //user related information
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  // comments: [
  //   {
  //     user: {
  //       type: mongoose.Schema.Types.ObjectId,
  //       ref: "User",
  //       required: true,
  //     },
  //     comment: {
  //       type: String,
  //       required: true,
  //     },
  //     default: [],
  //     createdAt: {
  //       type: Date,
  //       default: Date.now,
  //     },
  //   },
  // ],
  likes:[String],
  //time of creation
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Recipe = mongoose.model("Recipe", recipeSchema);

module.exports = { Recipe };
