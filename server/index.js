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


app.use("/uploads", express.static("uploads"))

app.use("/api/user", UserRoutes);
app.use("/api/recipe", RecipeRoutes);


httpServer.listen(3040);
