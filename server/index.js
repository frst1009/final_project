const express = require("express");
const { db } = require("./db");
const { createServer } = require("http");
const app = express();
const cors = require("cors");
const httpServer = createServer(app);
app.use(express.json());
app.use(cors());
db.connect();

const { UserRoutes } = require("./routes/userRoutes");
const { RecipeRoutes } = require("./routes/recipeRoutes");
// const { TagsRoutes } = require("./routes/tagRoutes");
// const { CategoryRoutes } = require("./routes/categoryRoutes");

app.use("/uploads", express.static("uploads"))

app.use("/api/user", UserRoutes);
app.use("/api/recipe", RecipeRoutes);
// app.use("/api/tags", TagsRoutes);
// app.use("/api/category", CategoryRoutes);

httpServer.listen(3040);
