const expres = require("express");
const { UserController } = require("../controllers/userController");
const { loginValidation, registerValidation } = require('../utilities/validation');
const validationError = require("../utilities/validationError");
const tokenAuth = require("../utilities/tokenAuth");
// const multer = require('multer');
// const path = require("path");
// const { v4: uuidv4 } = require('uuid');
const UserRoutes = expres.Router();


// var uniqueId = uuidv4()
// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, path.join(__dirname, "../uploads/profpics"));
//     },
//     filename: function (req, file, cb) {
//       cb(null, uniqueId  + file.originalname);
//     },
// });
  
// const fileFilter = (req, file, cb) => {
//     if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
//       cb(null, true);
//     } else {
//       cb(null, false);
//     }
//   };
  
// const upload = multer({
//     storage: storage,
//     limits: {
//       fileSize: 1024 * 1024 * 5,
//     },
//     fileFilter: fileFilter,
// });
UserRoutes.post("/register",registerValidation,validationError, UserController.register);
UserRoutes.post("/login", loginValidation, validationError,UserController.login);
UserRoutes.get("/authuser", tokenAuth, UserController.profileData);
UserRoutes.patch("/update", tokenAuth, UserController.profileUpdate);



module.exports = {
  UserRoutes,
};
