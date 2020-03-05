const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      max: 30,
      trim: true,
      index: true // indexing the username field because later we will be quering the db a lot depending on username, and indexing made it fast.
    },
    name: {
      type: String,
      required: true,
      trim: true,
      max: 50
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },
    password: {
      type: String,
      required: true
    },
    salt: String,
    avatar: {
      data: Buffer,
      contentType: String
    },
    description: String,
    profile: {
      type: String,
      required: true
    },
    resetPasswordLink: {
      data: String,
      default: ""
    },
    role: {
      type: Number,
      default: 0
    }
  },
  { timestamp: true }
);

// Hashing the password before saving the user
userSchema.pre("save", async function(next) {
  try {
    const saltRounds = Math.round(Math.random() * 9 + 1);
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPass = await bcrypt.hash(this.password, salt);
    this.password = hashedPass;
    this.salt = salt;
    return next();
  } catch (error) {
    return next(error);
  }
});

userSchema.methods.verifyPassword = function(userEnteredPassword, callback) {
  bcrypt.compare(userEnteredPassword, this.password, function(err, isEqual) {
    if (err) return callback(err, null);
    return callback(null, isEqual);
  });
};

// descibe model class using mongoose.model
module.exports = mongoose.model("User", userSchema);
