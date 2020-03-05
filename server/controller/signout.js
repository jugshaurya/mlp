const signout = (req, res, next) => {
  res.json({
    message: "Successfully signed Out"
  });
};

module.exports = signout;
