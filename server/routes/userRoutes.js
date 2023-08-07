const expres = require("express");
const { UserController } = require("../controllers/userController");
const { loginValidation, registerValidation } = require('../utilities/validation');
const validationError = require("../utilities/validationError");
const tokenAuth = require("../utilities/tokenAuth");
const multer = require('multer');
const path = require("path");
const { v4: uuidv4 } = require('uuid');//its for generation unique ids for pics
const UserRoutes = expres.Router();


var uniqueId = uuidv4()
const storageUser  = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, "../profuploads"));
    },
    filename: function (req, file, cb) {
      cb(null, uniqueId  + file.originalname);
    },
});
  
const fileFilter = (req, file, cb) => {//criterias
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
      cb(null, true);
    } else {
      cb(null, false);
    }
  };
  
const uploadUser = multer({//this is multer middleware called uploadUser
  storage: storageUser,//destination that was created above
    limits: {
      fileSize: 1024 * 1024 * 5,//limit file size to 5mb
    },
    fileFilter: fileFilter,//check earlier determined rules for pics
});
UserRoutes.post("/register",registerValidation, validationError,uploadUser.single("profilepicture"), UserController.register);
UserRoutes.post("/login", loginValidation, validationError,UserController.login);
UserRoutes.get("/authuser", tokenAuth, UserController.profileData);
UserRoutes.patch("/update", tokenAuth, UserController.profileUpdate);



module.exports = {
  UserRoutes,
};
