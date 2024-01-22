const { User } = require("../models/user");
var jwt = require("jsonwebtoken");
let privateKey = "ironmaiden";
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const crypto = require("crypto");

const isSignupAndLoginEnabled = false;
const UserController = {
  register: async (req, res) => {
    if (!isSignupAndLoginEnabled) {
      return res.status(403).json({ msg: 'Signup is currently disabled.' });
        }
    // const { username, email, password, confirmpassword, avatar} = req.body;
    // try {
    //   const data = await User.findOne({ email: email, username: username });
    //   if (data) {
    //     res.status(500).json({ msg: "This email already exists!" });
    //   } else if (password === confirmpassword) {
    //     const salt = bcrypt.genSaltSync();
    //     const hashedPassword = bcrypt.hashSync(password, salt);
    //     const newUser = await new User({
    //       email: email,
    //       username: username,
    //       password: hashedPassword,
    //       confirmpassword: hashedPassword,
    //       avatar: avatar,
    //     });

    //     await newUser.save();
    //     let token = jwt.sign({ _id: newUser._id }, privateKey,{
    //       expiresIn: '30d',
    //     }); if(token){
    //       res.status(200).json({ token: token });
    //     }
    //   } else {
    //     res
    //       .status(400)
    //       .json({ msg: "Password and confirm password do not match" });
    //   }
    // } catch (err) {
    //   console.log(err);
    //   res.status(500).json(err);
    // }
  },
  login: async (req, res) => {
    if (!isSignupAndLoginEnabled) {
      return res.status(403).json({ msg: 'Logins are currently disabled.' });
    }
    // try {
    //   let user = await User.findOne({
    //     email: req.body.email,
    //   });
  
    //   if (!user) {
    //     return res.status(400).json({
    //       message: 'User not found',
    //     });
    //   }
  
    //   const isPasswordValid = await bcrypt.compareSync(
    //     req.body.password,
    //     user.password
    //   );
  
    //   if (!isPasswordValid) {
    //     return res.status(400).json({
    //       message: 'Password does not match',
    //     });
    //   }
  
    //   let token = jwt.sign({ _id: user._id }, privateKey, {
    //     expiresIn: '30d',
    //   });
  
    //   if (token) {
    //     res.status(200).json({ token: token });
    //   } else {
    //     res.json('Please login!');
    //   }
    // } catch (error) {
    //   res.status(500).json({ message: 'An error occurred' });
    // }
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
    // forgottenPassword: async (req,res)=>{
    //   const { email } = req.body;
    //   try {
    //     const user=await User.findOne( {email})
    //     if (!user) {
    //       return res.status(404).json("Email does not exists!");
    //     }
    //     const resetToken = crypto.randomBytes(20).toString('hex');

    //     user.resetToken = resetToken;
    //     await user.save();
    //     transporter.sendMail({
    //       from: "bwal21879@gmail.com", // sender address
    //       to:email, // list of receivers
    //       subject: "Change password: ", // Subject line
    //       html: `
    //                   <p> In order to change your password click here</p>
    //                   <p> 
    //                   <a href="https://cookingmonsters.onrender.com/changepassword?token=${resetToken}&userId=${user._id}">
    //                 Reset your password!
    //                   </a>
    //                   </p>
    //               `,
    //     });
    //     return res.status(200).json("Email sent")
    //   } catch (error) {
    //       console.log(error);
    //       res.status(500).json({ error: "An error occurred" });
    //   }
    // },
//     changepassword:async (req,res)=>{
//       const userId=req.query.userId
//       const token=req.query.resetToken
//       const newPassword=req.body.password
//       try {
//         const user=await User.findById(userId)
//         console.log(userId);
//         if(!user){
//           console.log("1");
//          res.status(404).json("User not found");
//          return;
//         }
//         console.log(user.resetToken);
     
//     const salt = bcrypt.genSaltSync();
//     const hashedPassword = bcrypt.hashSync(newPassword, salt);
//     console.log("3");
    
//     user.password = hashedPassword;
//     user.resetToken = null;
//     user.resetTokenExpiry = null;
//     console.log("4");
//     await user.save();
//     res.status(200).json({
//       message: "Password changed successfully",
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ error: "An error occurred" });
//   }
// }
    }
  // const transporter = nodemailer.createTransport({
  //   service: "gmail",
  //   host: "smtp.gmail.com",
  //   port: 465,
  //   secure: true,
  //   auth: {
  //     type: "login",
  //     user: "bwal21879@gmail.com",
  //     pass: "rfdhsetvgzqqdpjb",
  //   },
  // });

module.exports = {
  UserController,
};
