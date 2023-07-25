const mongoose = require("mongoose");

const tagsSchema = new mongoose.Schema({
  recipes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Recipe" }],
  name: {
    type: String,
    required: true,
  },
});

const Tags = mongoose.model("Tags", tagsSchema);

module.exports = { Tags };
