const Joi = require("@hapi/joi");
const Tag = require("../../models/tag");
// validation
const schema = Joi.object({
  name: Joi.string()
    .min(5)
    .max(200)
    .required()
});

const create_a_tag = async (req, res, next) => {
  const { name: bodyname } = req.body;
  const name = bodyname.trim().toLowerCase();

  // 1. Validate user input
  const { error } = schema.validate({ name });
  if (error) {
    return res.status(422).json({ error: error.details[0].message });
  }

  // 2. now user name will be seperated by space, we join that with '-'
  const title = name
    .toLowerCase()
    .split(" ")
    .join("-");

  try {
    const tag = await Tag.findOne({ title: title });
    if (tag) return res.status(422).json({ error: "Tag already Available" });

    // tag is a new tag
    const newTag = new Tag({
      name: name,
      title: title
    });
    const createdTag = await newTag.save();
    res.status(201).json({
      tag: createdTag,
      message: "Tag Created Succesfully"
    });
  } catch (error) {
    res.status(500).json({ error: "Tag Creation Error" });
  }
};

module.exports = create_a_tag;
