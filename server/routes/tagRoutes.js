const expres = require("express");
const { TagsController } = require("../controllers/tagController");

const TagsRoutes = expres.Router();

TagsRoutes.get("/", TagsController.getAll);
TagsRoutes.post("/", TagsController.add);
TagsRoutes.get("/:id", TagsController.getById);

module.exports = {
    TagsRoutes,
};
