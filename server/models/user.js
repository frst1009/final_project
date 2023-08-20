const { default: mongoose } = require("mongoose");

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  confirmpassword: { type: String, required: true },
  profilepicture: { type: String },
  resetToken: { type: String },
  resetTokenExpiry:  { type: Date },
  
}, { timestamps: true } );

const User = new mongoose.model("User", UserSchema);

module.exports = {
  User,
};
