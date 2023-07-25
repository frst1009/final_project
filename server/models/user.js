const { default: mongoose } = require("mongoose");

const UserSchema = new mongoose.Schema({
  email: String,
  password: String,
  username: String,
});

const User = new mongoose.model("User", UserSchema);

module.exports = {
  User,
};
