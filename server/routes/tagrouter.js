const express = require("express");
const router = express.Router();

const create_a_tag = require("../controller/tag/create_a_tag");
const delete_a_tag = require("../controller/tag/delete_a_tag");
const get_a_tag = require("../controller/tag/get_a_tag");
const get_all_tags = require("../controller/tag/get_all_tags");
const requireAuth = require("../middlewares/requireAuth");
const getUserFromDB = require("../middlewares/getUserFromDB");
const requireAdmin = require("../middlewares/requireAdmin");

// only admin can create/delete a new tag
// create a series
router.post("/", requireAuth, getUserFromDB, requireAdmin, create_a_tag);
//  delete a series
router.delete(
  "/:title",
  requireAuth,
  getUserFromDB,
  requireAdmin,
  delete_a_tag
);

// get a series
router.get("/:title", get_a_tag);
// get all series
router.get("/", get_all_tags);

module.exports = router;
