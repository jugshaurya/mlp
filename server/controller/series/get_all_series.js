const Series = require("../../models/series");

const get_all_series = async (req, res, next) => {
  try {
    const all_series = await Series.find({});
    res.status(201).json({
      all_series,
      message: "Series Retrieved Succesfully"
    });
  } catch (error) {
    res.status(500).json({ error: "All Series Retrieval Error" });
  }
};

module.exports = get_all_series;
