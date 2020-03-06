const Joi = require("@hapi/joi");
const Series = require("../../models/series");
// validation
const schema = Joi.object({
  name: Joi.string()
    .min(5)
    .max(200)
    .required()
});

const create_a_series = async (req, res, next) => {
  const { name: bodyname } = req.body;
  const name = bodyname.trim();

  // 1. Validate user input
  const { error } = schema.validate({ name });
  if (error) {
    return res.status(422).json({ error: error.details[0].message });
  }

  // 2. now user title will be seperated by space, we join that with '-'
  const title = name
    .toLowerCase()
    .split(" ")
    .join("-");

  try {
    const series = await Series.findOne({ title });
    if (series)
      return res.status(422).json({ error: "Series already Available" });

    // series is new series
    const newSeries = new Series({
      name,
      title
    });
    const createdSeries = await newSeries.save();
    res.status(201).json({
      series: createdSeries,
      message: "Series Created Succesfully"
    });
  } catch (error) {
    res.status(500).json({ error: "Series Creation Error" });
  }
};

module.exports = create_a_series;
