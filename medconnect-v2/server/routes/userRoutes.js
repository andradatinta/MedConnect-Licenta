const express = require("express");

const router = express.Router();

const userController = require("../controllers/userController");
const routeProtect = require("../middleware/authMiddleware");
const userCheckRole = require("../middleware/userRoleCheckMiddleware");

router.post("/signup/doctor", userController.registerUserDoctor);
router.post("/signup/cmr", userController.registerUserCMR);
router.post("/login", userController.loginUser);
router.get("/loggedUser", routeProtect, userController.getLoggedInUser);
router.get(
  "/searchedUsers",
  routeProtect,
  userCheckRole(["cmr_member"]),
  userController.getSearchedForUsers
);
router.get("/:userId", userController.getUserDetails);

module.exports = router;
