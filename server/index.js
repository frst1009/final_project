const express = require("express");
require('dotenv').config();
const { db } = require("./db");
const { createServer } = require("http");
const app = express();
const cors = require("cors");
const { postCreateValidation, registerValidation, loginValidation } = require("./utilities/validation");
const validationError = require("./utilities/validationError");
const { RecipeController } = require("./controllers/recipeController");
const tokenAuth = require("./utilities/tokenAuth");
const httpServer = createServer(app);
app.use(express.json());
app.use(cors());
db.connect();
const { UserController } = require("./controllers/userController");
const multer = require("multer");
const fs = require("fs")

const avatarStorage = multer.diskStorage({
  destination: (_, __, cb) => {
    if (!fs.existsSync('avatars')) {
      fs.mkdirSync('avatars');
    }
    cb(null, 'avatars');
  },
  filename: (_, file, cb) => {
    cb(null, file.originalname);
  },
});

const storage = multer.diskStorage({
    destination: (_, __, cb) => {
      if (!fs.existsSync('uploads')) {
        fs.mkdirSync('uploads');
      }
      cb(null, 'uploads');
    },
    filename: (_, file, cb) => {
      cb(null, file.originalname);
    },
  });
  const uploadAvatar = multer({ storage: avatarStorage }).single('avatar');
  const uploadRecipeImage = multer({ storage }).single('image');
  app.use("/uploads", express.static("uploads"));
  app.use("/avatars", express.static("avatars"));
  app.post('/upload-avatar', uploadAvatar, (req, res) => {
    console.log("Avatar Original Name:", req.file.originalname);
    res.json({
      url: `/avatars/${req.file.originalname}`,
    });
  });
app.post('/upload', tokenAuth, uploadRecipeImage, (req, res) => {
  console.log("Original Name:", req.file.originalname);  
  res.json({
      url: `/uploads/${req.file.originalname}`,
    });
  });
  
  
app.post("/api/recipe/add",tokenAuth, postCreateValidation, validationError, RecipeController.add)
app.get("/api/recipe/", RecipeController.getAll);
app.get("/api/recipe/alltags", RecipeController.tags);
app.get("/api/recipe/tags/:tag", RecipeController.gettags);
app.get("/api/recipe/category", RecipeController.categories);
app.get("/api/recipe/search", RecipeController.searchByTitle);
app.get("/api/recipe/userRecipe", tokenAuth,RecipeController.recipeOfUser);
app.post("/api/recipe/like/:id",tokenAuth, RecipeController.hanldlelike);
app.get("/api/recipe/populars", RecipeController.getpopulars);
app.get("/api/recipe/:id", RecipeController.getById);
app.delete("/api/recipe/:id",tokenAuth, RecipeController.deleterecipe);
app.patch("/api/recipe/:id", postCreateValidation, validationError, RecipeController.update);
app.post("/api/recipe/:id/comments",tokenAuth, RecipeController.comments);
app.delete("/api/recipe/:id/comments/:commentId",tokenAuth, RecipeController.deleteComment);
app.put("/api/recipe/:id/comments/:commentId",tokenAuth, RecipeController.editComment);


app.post("/api/user/register",registerValidation, validationError, UserController.register);
app.post("/api/user/login", loginValidation, validationError,UserController.login);
app.get("/api/user/authuser", tokenAuth, UserController.profileData);
app.patch("/api/user/update", tokenAuth, UserController.profileUpdate);
app.get("/api/user/getUsers", UserController.getUsers );
// app.post("/api/user/forgottenPassword", UserController.forgottenPassword);
// app.put("/api/user/changepassword",UserController.changepassword);


httpServer.listen(3040);
