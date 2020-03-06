const Tag = require("../../models/tag");

const get_all_tags = async (req, res, next) => {
  try {
    const all_tags = await Tag.find({});
    res.status(200).json({
      all_tags,
      message: "Tag Retrieved Succesfully"
    });
  } catch (error) {
    res.status(500).json({ error: "All Tag Retrieval Error" });
  }
};

module.exports = get_all_tags;
