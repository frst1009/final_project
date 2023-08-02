const expres = require("express");
const { UserController } = require("../controllers/userController");
// const { loginValidation, registerValidation } = require('../validation');


const UserRoutes = expres.Router();

UserRoutes.post("/register", UserController.register);
UserRoutes.post("/login", UserController.login);
UserRoutes.post("/check", UserController.checkUser);
UserRoutes.patch("/update", UserController.profileUpdate);
UserRoutes.get("/:id", UserController.profileData);



module.exports = {
  UserRoutes,
};
