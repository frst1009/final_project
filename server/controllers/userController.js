const { User } = require("../models/user");
var jwt = require("jsonwebtoken");
let privateKey = "ironmaiden";
const bcrypt = require("bcrypt");

const UserController = {
  register: async (req, res) => {
    const { username, email, password, confirmpassword } = req.body;
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
        });

        await newUser.save();
        res.status(201).json({ msg: "User registered successfully!" });
      } else {
        res
          .status(400)
          .json({ msg: "Password and confirm password do not match" });
      }
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // login: async (req, res) => {
  //   try {
  //     let user = await User.findOne({
  //       email: req.body.email,
  //     });

  //     if (!user) {
  //       return res.status(404).json({ message: "User not found!" });
  //     }

  //     const isPasswordValid = await bcrypt.compare(
  //       req.body.password,
  //       user.password
  //     );
  //     if (!isPasswordValid) {
  //       return res
  //         .status(401)
  //         .json({ message: "Incorrect username or password!" });
  //     }

  //     let token = jwt.sign({ email: req.body.email }, privateKey);
  //     res.status(200).json({ token: token });
  //   } catch (error) {
  //     res.status(500).json({ message: "Internal server error!" });
  //   }
  // },
  login: async(req,res)=>{
    try {
      let user = await User.findOne({
              email: req.body.email,
            });
            if(user){
              const isPasswordValid= await bcrypt.compareSync(
                      req.body.password,
                      user.password
                    );
                    if(isPasswordValid){
      let token = jwt.sign({ email: req.body.email }, privateKey);
      if(token){
        res.status(200).json({ token: token });
      }else{
        res.json("Please login!")
      }
                    }
                    else{
                      res.json({msg : "Password does not matched"});
                  }
            }
            else{
              res.json({msg : "Email not found !!"});
          }
    } catch (error) {
      res.json({msg : error.message});
    }
  },
  profileData: async (req, res) => {
    //get_user
    const id = req.params.id;
    try {
      const user = await User.findById(id);

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
    //update_user
    const { username, email, password } = req.body;
    try {
      const updateUser = await User.findOneAndUpdate(email, {
        username: username,
        email: email,
        password: bcrypt.hashSync(password, bcrypt.genSaltSync()),
        confirmpassword: bcrypt.hashSync(password, bcrypt.genSaltSync()),
      });
      if (updateUser) {
        res.status(200).json({ msg: "Update Successfull!!", user: updateUser });
      } else {
        res.json({ msg: "user not updated" });
      }
    } catch (error) {
      res.json({ msg: error.message });
    }
  },
  checkUser: async (req, res) => {
    //verify_user
    try {
      if (req.body.token) {
        const token = req.body.token;

        const verifyToken = jwt.verify(token, privateKey);

        if (verifyToken) {
          res.status(200).json({ msg: "User is verified", isAuth: true });
        } else {
          res.json({ msg: "Login first !!", isAuth: false });
        }
      } else {
        res.json({ msg: "Token not found" });
      }
    } catch (error) {
      res.json({ msg: error.message, isAuth: false });
    }
  },

};

module.exports = {
  UserController,
};
