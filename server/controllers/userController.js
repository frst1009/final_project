const { User } = require("../models/user");
var jwt = require("jsonwebtoken");
let privateKey = "ironmaiden";
const bcrypt = require('bcrypt');

const UserController = {
  
register: async (req, res) => {
  try {
    let email = req.body?.email.toLowerCase();
    const data = await User.findOne({ email: email });

    if (data) {
      res.status(500).json({ msg: "This email already exists!" });
    } else {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      const newUser = new User({
        email: email,
        username: req.body.username,
        password: hashedPassword,
      });

      await newUser.save(); // Use await here to wait for the user to be saved
      res.status(201).json({ msg: "User registered successfully!" });
    }
  } catch (err) {
    res.status(500).json(err);
  }
},
  login: async (req, res) => {
    let user = await User.findOne({
      email: req.body.email,
    })
    if (!user) {
      res.json("User is not found!");
    } 
    const isPasswordValid= await bcrypt.compare(req.body.password, user.password)
    if(!isPasswordValid){
      res.json("Username or Password is Incorrect!")
    }
    let token = jwt.sign(req.body.email, privateKey);
    res.status(200).json({ token: token });

  },
  token: (req, res) => {
    let token = req.body.token;

    try {
      const email = jwt.verify(token, privateKey);
      User.findOne({ email: email }).then(function (user) {
        res.status(200).json({ user: user });
      });
    } catch (error) {
      res.status(500).json({ message: "Token error!" });
    }
  },
};

module.exports = {
  UserController,
};
