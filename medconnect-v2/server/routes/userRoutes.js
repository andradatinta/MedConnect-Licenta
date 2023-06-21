const express = require("express");

const router = express.Router();

const userController = require("../controllers/userController");
const routeProtect = require("../middleware/authMiddleware");
const userCheckRole = require("../middleware/userRoleCheckMiddleware");

router.post("/register-doctor", userController.registerUserDoctor);
router.post("/register-cmr", userController.registerUserCMR);
router.post("/login", userController.loginUser);
router.get(
  "/search",
  routeProtect,
  userCheckRole(["cmr_member"]),
  userController.getSearchedForUsers
);
router.get("/:userId", userController.getUserDetails);
router.post("/signup-event", routeProtect, userController.signUpForEvent);
router.get("/:userId/credits", userController.calculateUserCredits);
router.get("/:userId/accreditation", userController.getUserAccreditationDate);
router.put("/change-password", routeProtect, userController.changePassword);
router.put("/change-email", routeProtect, userController.changeEmail);
router.post("/forgot-password", userController.forgotPassword);
router.post("/reset-password/:token", userController.resetPassword);

module.exports = router;
