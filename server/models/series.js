const mongoose = require("mongoose");
const seriesSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      min: 5,
      max: 200,
      trim: true,
      unique: true
    },
    title: {
      type: String,
      min: 5,
      max: 220, // assuming atmax 20 words per sentence
      unique: true,
      required: true,
      lowercase: true,
      trim: true,
      index: true
    }
  },
  { timestamps: true }
);

// descibe model class using mongoose.model
module.exports = mongoose.model("Series", seriesSchema);
