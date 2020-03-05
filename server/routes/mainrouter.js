const express = require("express");
const router = express.Router();
const signup = require("../controller/signup");
const signin = require("../controller/signin");
const signout = require("../controller/signout");
const requireAuth = require("../controller/requireAuth");
const getUserFromDB = require("../controller/getUserFromDB");

const requireAdmin = require("../controller/requireAdmin");
// default
router.get("/", (req, res, next) => {
  res.json({ message: "Welcome to version 1 api" });
});

router.post("/signup", signup);
router.post("/signin", signin);
router.post("/signout", signout);

router.get("/profile", requireAuth, getUserFromDB, async (req, res, next) => {
  res.json({ user: req.user });
});
module.exports = router;
