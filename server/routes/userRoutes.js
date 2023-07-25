const expres = require("express");
const { UserController } = require("../controllers/userController");

const UserRoutes = expres.Router();

UserRoutes.post("/register", UserController.register);
UserRoutes.post("/login", UserController.login);
UserRoutes.post("/token", UserController.token);

module.exports = {
  UserRoutes,
};
