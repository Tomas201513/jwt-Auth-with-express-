require("dotenv").config();
const jwt = require("jsonwebtoken");
const express = require("express");
const router = express.Router();

router.post("/", (req, res) => {
  const refreshToken = req.header("x-auth-token");
  //   console.log(refreshToken);
  if (!refreshToken)
    return res.status(401).send("Access denied. No token provided.");

  try {
    const decoded = jwt.verify(refreshToken, process.env.JWT_SECRET_KEY);
    jwt.verify(refreshToken, process.env.JWT_SECRET_KEYY, (err, user) => {
      if (err) return res.status(403).send("Invalid token.");
      console.log(decoded);

      const { accessToken } = user.generateAuthToken();
      res.send({ accessToken });
    });
  } catch (ex) {
    res.status(400).send("Invalid token.");
    console.log("exxxx");
  }
});

module.exports = router;
