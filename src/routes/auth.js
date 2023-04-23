const Joi = require("joi");
const bcrypt = require("bcrypt");
const _ = require("lodash");
const { User } = require("../models/user");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Invalid email or password.");

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send("Invalid email or password.");

  const { accessToken, refreshToken } = user.generateAuthToken();
  res.send({ accessToken, refreshToken });
});

// app.post("/token", (req, res) => {
//   const refreshToken = req.header("x-auth-token");
//   if (!refreshToken)
//     return res.status(401).send("Access denied. No token provided.");

//   try {
//     const decoded = jwt.verify(refreshToken, process.env.JWT_SECRET_KEY);
//     jwt.verify(refreshToken, process.env.JWT_SECRET_KEY, (err, user) => {
//       if (err) return res.status(403).send("Invalid token.");
//       const { accessTooken, refreshTooken } = user.generateAuthToken();
//       res.send({ accessTooken });
//     });
//   } catch (ex) {
//     res.status(400).send("Invalid token.");
//   }
// });

function validate(req) {
  const schema = Joi.object({
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(255).required(),
  });

  return schema.validate(req);
}

module.exports = router;
