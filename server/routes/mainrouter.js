const express = require("express");
const router = express.Router();

const signup = require("../controller/signup");
const signin = require("../controller/signin");
const signout = require("../controller/signout");

// default
router.get("/", (req, res, next) => {
  res.json({ time: Date(), message: "Welcome to version 1 api" });
});

router.post("/signup", signup);
router.post("/signin", signin);
router.get("/signout", signout);

module.exports = router;
