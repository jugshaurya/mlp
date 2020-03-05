// Middleware to be used when required the resource to be accessed only by admin not others
const requireAdmin = (req, res, next) => {
  // if user is admin return req.admin as req.user as well
  const role = req.user.role;
  if (role !== 1) {
    return res.status(401).json({
      message: "User is not Admin. Admin Resources are acessed by admin only."
    });
  }
  next();
};
module.exports = requireAdmin;
