const express = require("express");
const router = express.Router();

const create_a_series = require("../controller/series/create_a_series");
const delete_a_series = require("../controller/series/delete_a_series");
const get_a_series = require("../controller/series/get_a_series");
const get_all_series = require("../controller/series/get_all_series");
const requireAuth = require("../middlewares/requireAuth");
const getUserFromDB = require("../middlewares/getUserFromDB");
const requireAdmin = require("../middlewares/requireAdmin");

// only admin can create/delete a new series

// create a series
router.post("/", requireAuth, getUserFromDB, requireAdmin, create_a_series);
//  delete a series
router.delete(
  "/:title",
  requireAuth,
  getUserFromDB,
  requireAdmin,
  delete_a_series
);

// get a series
router.get("/:title", get_a_series);
// get all series
router.get("/", get_all_series);

module.exports = router;
