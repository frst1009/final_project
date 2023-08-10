const express = require("express");
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
const path = require("path");
const { UserController } = require("./controllers/userController");



// app.use("/uploads", express.static("uploads"));
// app.use("/profilepicture", express.static("profilepicture"));

// app.get("/image/:imageName", (req, res) => {
//     const imageName = req.params.imageName;
//     const imagePath = path.join(__dirname, "uploads", imageName);
//     res.sendFile(imagePath);
//   }); upload.single("image")

// app.post('/upload', tokenAuth, upload.single('image'), (req, res) => {
//     res.json({
//       url: `/uploads/${req.file.originalname}`,
//     });
//   });
  
  
app.post("/api/recipe/add",tokenAuth, postCreateValidation, validationError, RecipeController.add)
app.get("/api/recipe/", RecipeController.getAll);
app.get("/api/recipe/:id", RecipeController.getById);
app.post("/api/recipe/like/:id",tokenAuth, RecipeController.hanldlelike);
app.delete("/api/recipe/:id",tokenAuth, RecipeController.deleterecipe);
app.patch("/api/recipe/:id", postCreateValidation, validationError, RecipeController.update);
app.post("/api/recipe/comments",tokenAuth, RecipeController.comments);



app.post("/api/user/register",registerValidation, validationError, UserController.register);
app.post("/api/user/login", loginValidation, validationError,UserController.login);
app.get("/api/user/authuser", tokenAuth, UserController.profileData);
app.patch("/api/user/update", tokenAuth, UserController.profileUpdate);

httpServer.listen(3040);
