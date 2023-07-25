const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  recipe: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Recipe",
  }],
});

const Category = mongoose.model("Category", categorySchema);

module.exports = { Category };
