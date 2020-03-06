const Joi = require("@hapi/joi");
const Series = require("../../models/series");
// validation
const schema = Joi.object({
  title: Joi.string()
    .min(5)
    .max(220)
    .required()
});

const get_a_series = async (req, res, next) => {
  const { title: bodytitle } = req.params;
  const title = bodytitle.trim();

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
    const series = await Series.findOne({ title: modifiedTitle });

    if (series)
      return res
        .status(200)
        .json({ series, message: "A Series retrieved Successfully" });
    return res.status(404).json({ message: "Series Not Found" });
  } catch (error) {
    res.status(500).json({ error: "A Series Retrieval Error" });
  }
};

module.exports = get_a_series;
