require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const { func } = require("joi");
const { route } = require("./routes");
const app = express();

async function main() {
  mongoose
    .connect("mongodb://localhost/gascontrol")
    .then(() => console.log("Connected to MongoDB..."))
    .catch((err) => console.error("Could not connect to MongoDB..."));

  app.use(express.json());
  app.use("/api/genres", route);

  const port = process.env.PORT || 3000;
  app.listen(port, () => console.log(`Listening on port ${port}...`));
}

module.exports = main;
