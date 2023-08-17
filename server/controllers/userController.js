const { User } = require("../models/user");
var jwt = require("jsonwebtoken");
let privateKey = "ironmaiden";
const bcrypt = require("bcrypt");

const UserController = {
  register: async (req, res) => {
    const { username, email, password, confirmpassword, profilepicture } = req.body;
    try {
      const data = await User.findOne({ email: email, username: username });
      if (data) {
        res.status(500).json({ msg: "This email already exists!" });
      } else if (password === confirmpassword) {
        const salt = bcrypt.genSaltSync();
        const hashedPassword = bcrypt.hashSync(password, salt);
        const newUser = await new User({
          email: email,
          username: username,
          password: hashedPassword,
          confirmpassword: hashedPassword,
          profilepicture: profilepicture,
        });

        await newUser.save();
        let token = jwt.sign({ _id: newUser._id }, privateKey,{
          expiresIn: '30d',
        }); if(token){
          res.status(200).json({ token: token });
        }
      } else {
        res
          .status(400)
          .json({ msg: "Password and confirm password do not match" });
      }
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  login: async (req, res) => {
    try {
      let user = await User.findOne({
        email: req.body.email,
      });
      console.log("User:", user);
      if (!user) {
        return res.status(400).json({
          message: 'User not found',}); // Return here to exit the function if user is not found
      }
  
      const isPasswordValid = await bcrypt.compareSync(
        req.body.password,
        user.password
      );
      if (isPasswordValid) {
        let token = jwt.sign({ _id: user._id }, privateKey, {
          expiresIn: "30d",
        });
  
        if (token) {
          res.status(200).json({ token: token });
        } else {
          res.json("Please login!");
        }
      } else {
        res.json({ msg: "Password does not match" });
      }
    } catch (error) {
      res.json({ msg: error.message });
    }
  },
  
  profileData: async (req, res) => {
    //get by id the user
    try {
      const user = await User.findById(req.userId);
      if (user) {
        res.status(200).json({ user: user });
      } else {
        res.json({ msg: "User not found" });
      }
    } catch (error) {
      res.json({ msg: error.message });
    }
  },

  profileUpdate: async (req, res) => {
    const { username, email, password } = req.body;
    const userId = req.userId; 
    try {
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ msg: 'User not found' });
      }
      //here is the updated user information
      user.username = username;
      user.email = email;
      user.password = bcrypt.hashSync(password, bcrypt.genSaltSync());
      user.confirmpassword = bcrypt.hashSync(password, bcrypt.genSaltSync());
      await user.save();
      res.status(200).json({ msg: 'Update Successfull!', user });
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  },

  getUsers: async (req, res) => {
    try {
      const user = await User.find().exec();

      res.status(200).json(user);
    } catch (error) {
      
      res
        .status(500)
        .json({ error: "An error occurred while retrieving users." });
    }
  },
  
};

module.exports = {
  UserController,
};
