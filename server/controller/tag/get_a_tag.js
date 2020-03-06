const Joi = require("@hapi/joi");
const Tag = require("../../models/tag");
// validation
const schema = Joi.object({
  title: Joi.string()
    .min(5)
    .max(220)
    .required()
});

const get_a_tag = async (req, res, next) => {
  const { title: bodytitle } = req.params;
  const title = bodytitle.trim().toLowerCase();

  // 1. Validate user input
  const { error } = schema.validate({ title });
  if (error) {
    return res.status(422).json({ error: error.details[0].message });
  }

  // 2. now user title will be seperated by space, we join that with '-'
  const modifiedTitle = title
    .toLowerCase()
    .split(" ")
    .join("-");

  try {
    const tag = await Tag.findOne({ title: modifiedTitle });
    if (tag)
      return res
        .status(200)
        .json({ tag, message: "A Tag retrieved Successfully" });
    return res.status(404).json({ message: "Tag Not Found" });
  } catch (error) {
    res.status(500).json({ error: "A Tag Retrieval Error" });
  }
};

module.exports = get_a_tag;
