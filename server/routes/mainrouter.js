const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
  res.json({ time: Date() });
});

module.exports = router;
