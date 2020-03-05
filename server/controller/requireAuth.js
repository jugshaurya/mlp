const express_jwt = require("express-jwt");
const requireAuth = express_jwt({ secret: process.env.JWT_SECRET_KEY });
module.exports = requireAuth;
