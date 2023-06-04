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
router.post("/eventSignUp", routeProtect, userController.signUpForEvent);
router.get("/:userId/credits", userController.calculateUserCredits);
router.get("/:userId/accreditation", userController.getUserAccreditationDate);
router.put("/updatePassword", routeProtect, userController.changePassword);
router.put("/updateEmail", routeProtect, userController.changeEmail);
router.post("/forgotPassword", userController.forgotPassword);
router.post("/resetPassword/:token", userController.resetPassword);

module.exports = router;
