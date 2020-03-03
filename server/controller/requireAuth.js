const express_jwt = require("express-jwt");

const requireAuth = (req, res, next) => {
  return express_jwt({ secret: process.env.JWT_SECRET_KEY });
};

module.exports = requireAuth;
