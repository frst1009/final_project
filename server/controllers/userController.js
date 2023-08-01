const { User } = require("../models/user");
var jwt = require("jsonwebtoken");
let privateKey = "ironmaiden";
const bcrypt = require('bcrypt');

const UserController = {
  
register: async (req, res) => {
  const { username, email, password, confirmpassword } = req.body;
  try {
    const data = await User.findOne({ email: email, username: username });

    if (data) {
      res.status(500).json({ msg: "This email already exists!" });
    } else if(password === confirmpassword){
      const salt = bcrypt.genSaltSync();
      const hashedPassword = bcrypt.hashSync(password, salt);
      const newUser = await new User({
        email: email,
        username: username,
        password: hashedPassword,
        confirmpassword: hashedPassword
      });

      await newUser.save(); 
      res.status(201).json({ msg: "User registered successfully!" });
    }
    else {
      res.status(400).json({ msg: "Password and confirm password do not match" });
    }
  } catch (err) {
    res.status(500).json(err);
  }
},
login: async (req, res) => {
  try {
    let user = await User.findOne({
      email: req.body.email,
    });

    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    } 

    const isPasswordValid = await bcrypt.compare(req.body.password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Incorrect username or password!" });
    }

    let token = jwt.sign({ email: req.body.email }, privateKey)
    res.status(200).json({ token: token });
  } catch (error) {
    res.status(500).json({ message: "Internal server error!" });
  }
},

token: async (req, res) => {
  let token = req.body.token;
  console.log("Token:", token);
  try {
    const decodedToken = jwt.verify(token, privateKey);
    const email = decodedToken.email; // Extract the email value from the decoded token
    console.log("Decoded Email:", email);

    const user = await User.findOne({ email: email }); // Use the email value to find the user
    console.log("User:", user);
    res.status(200).json({ user: user });
  } catch (error) {
    console.error("Token Verification Error:", error);
    res.status(500).json({ message: "Token error!" });
  }
},

};

module.exports = {
  UserController,
};
