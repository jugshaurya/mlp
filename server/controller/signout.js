const signout = (req, res, next) => {
  res.clearCookie("token");
  res.send({
    message: "Signout Done!"
  });
};

module.exports = signout;
