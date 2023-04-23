require("dotenv").config();

const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
const mongoose = require("mongoose");
const genres = require("./src/routes/genres");
const refresh = require("./src/routes/refresh");
const users = require("./src/routes/users");
const auth = require("./src/routes/auth");
const express = require("express");
const app = express();

if (!process.env.JWT_SECRET_KEY) {
  console.error("FATAL ERROR: jwtPrivateKey is not defined.");
  process.exit(1);
}

mongoose
  .connect("mongodb://localhost/gas")
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error("Could not connect to MongoDB..."));

app.use(express.json());
app.use("/api/genres", genres);
app.use("/api/users", users); //register
app.use("/api/auth", auth); //login
app.use("/api/refresh", refresh); //refresh token

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
