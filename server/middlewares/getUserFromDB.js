const User = require("../models/user");

// Middleware to get the user from db if exist and adding result to req.user
const getUserFromDB = async (req, res, next) => {
  // if user is admin return req.admin as req.user as well
  try {
    const userId = req.user._id;
    const user = await User.findOne({ _id: userId });
    if (!user) throw new Error("User not Found");
    user.password = user.salt = undefined;
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ error: error.message });
  }
};
module.exports = getUserFromDB;
