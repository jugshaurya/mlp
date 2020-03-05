const express = require("express");
const router = express.Router();

const signin = require("../controller/signin");
const signup = require("../controller/signup");
const signout = require("../controller/signout");
const seriesRouter = require("./seriesrouter");
// default
router.get("/", (req, res, next) => {
  res.json({ message: "Welcome to version 1 api" });
});

// user routers
router.post("/signup", signup);
router.post("/signin", signin);
router.post("/signout", signout);

// series routers
router.use("/series", seriesRouter);

module.exports = router;
