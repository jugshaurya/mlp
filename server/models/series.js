const mongoose = require("mongoose");
const seriesSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      max: 50,
      trim: true
    },
    title: {
      type: String,
      unique: true,
      required: true,
      lowercase: true,
      trim: true,
      index: true
    }
  },
  { timestamp: true }
);

// descibe model class using mongoose.model
module.exports = mongoose.model("Series", seriesSchema);
