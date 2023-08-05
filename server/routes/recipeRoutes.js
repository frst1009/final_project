const expres = require("express");
const { RecipeController } = require("../controllers/recipeController");
const multer = require('multer');
const path = require("path");
const { v4: uuidv4 } = require('uuid');
const { postCreateValidation } = require("../utilities/validation");
const validationError = require("../utilities/validationError");
const tokenAuth = require("../utilities/tokenAuth");
const RecipeRoutes = expres.Router();


var uniqueId = uuidv4()
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, "../uploads"));
    },
    filename: function (req, file, cb) {
      cb(null, uniqueId  + file.originalname);
    },
});
  
const fileFilter = (req, file, cb) => {
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
      cb(null, true);
    } else {
      cb(null, false);
    }
  };
  
const upload = multer({
    storage: storage,
    limits: {
      fileSize: 1024 * 1024 * 5,
    },
    fileFilter: fileFilter,
});

RecipeRoutes.post("/add",tokenAuth, postCreateValidation, validationError, upload.single("image"), RecipeController.add);
RecipeRoutes.get("/", RecipeController.getAll);
RecipeRoutes.get("/:id", RecipeController.getById);
RecipeRoutes.post("/like/:id",tokenAuth, RecipeController.hanldlelike);
RecipeRoutes.delete("/:id",tokenAuth, RecipeController.deleterecipe);
RecipeRoutes.patch("/:id", postCreateValidation, validationError, RecipeController.update);
RecipeRoutes.put("/comments",tokenAuth, RecipeController.comments);

//update, comment the post

module.exports = {
  RecipeRoutes, upload,
};
