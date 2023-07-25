const expres = require("express");
const { RecipeController } = require("../controllers/recipeController");
const multer = require('multer');
const path = require("path");
const { v4: uuidv4 } = require('uuid');
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

RecipeRoutes.post("/add",  upload.single("image"), RecipeController.add);
RecipeRoutes.get("/", RecipeController.getAll);
RecipeRoutes.get("/:id", RecipeController.getById);

module.exports = {
  RecipeRoutes, upload,
};
