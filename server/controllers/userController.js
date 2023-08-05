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
      let token = jwt.sign({ _id: user._id }, privateKey,{
				expiresIn: '30d',
			}
);
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


  
};

module.exports = {
  UserController,
};
