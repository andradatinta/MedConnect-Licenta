// userRoleMiddleware.js
const asyncHandler = require("express-async-handler");

const userCheckRole = (roles) => {
  return asyncHandler(async (req, res, next) => {
    if (!roles.includes(req.user.type)) {
      console.log(req.user.type);
      res.status(403);

      throw new Error("Forbidden access");
    }
    next();
  });
};

module.exports = userCheckRole;
