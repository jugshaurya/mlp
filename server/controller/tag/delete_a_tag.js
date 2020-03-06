const Joi = require("@hapi/joi");
const Tag = require("../../models/tag");
// validation
const schema = Joi.object({
  title: Joi.string()
    .min(5)
    .max(220)
    .required()
});

const delete_a_series = async (req, res, next) => {
  const { title: paramstitle } = req.params;
  const title = paramstitle.trim().toLowerCase();

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
    const { ok, deletedCount } = await Tag.deleteOne({
      title: modifiedTitle
    });

    if (!ok) throw new Error("Tag Deletion Error");
    if (!deletedCount)
      return res.status(200).json({
        message: "No tag found for this name, but No Errors Chill!"
      });
    return res.status(200).json({ message: "Tag Deleted Successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = delete_a_series;
